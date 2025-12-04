// TestMatching.tsx - Temporary debugging component
// Place this in: src/pages/BuddyConnector/TestMatching.tsx
// Add it as a temporary 5th tab to test the matching logic

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../services/SupabaseClient';

export const TestMatching: React.FC = () => {
  const { user } = useAuth();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    if (!user) {
      setResults({ error: 'No user logged in' });
      return;
    }

    setLoading(true);
    const testResults: any = {
      userId: user.id,
      email: user.email,
      steps: []
    };

    try {
      // Step 1: Get user's domains
      console.log('Step 1: Getting user domains...');
      const { data: userDomains, error: domainError } = await supabase
        .from('user_domains')
        .select('domain_id')
        .eq('user_id', user.id);

      testResults.steps.push({
        step: 1,
        name: 'User Domains',
        success: !domainError && userDomains && userDomains.length > 0,
        data: userDomains,
        error: domainError,
        count: userDomains?.length || 0
      });

      if (domainError || !userDomains || userDomains.length === 0) {
        testResults.conclusion = 'FAIL: User has no domains selected';
        setResults(testResults);
        setLoading(false);
        return;
      }

      const domainIds = userDomains.map(d => d.domain_id);
      console.log('User domain IDs:', domainIds);

      // Step 2: Find users with matching domains
      console.log('Step 2: Finding matching users...');
      const { data: matchingUsers, error: matchError } = await supabase
        .from('user_domains')
        .select('user_id, domain_id')
        .in('domain_id', domainIds)
        .neq('user_id', user.id);

      testResults.steps.push({
        step: 2,
        name: 'Matching Users',
        success: !matchError && matchingUsers && matchingUsers.length > 0,
        data: matchingUsers,
        error: matchError,
        count: matchingUsers?.length || 0
      });

      if (matchError || !matchingUsers || matchingUsers.length === 0) {
        testResults.conclusion = 'FAIL: No matching users found';
        setResults(testResults);
        setLoading(false);
        return;
      }

      // Step 3: Get unique user IDs
      const uniqueUserIds = [...new Set(matchingUsers.map(m => m.user_id))];
      console.log('Unique user IDs:', uniqueUserIds);

      testResults.steps.push({
        step: 3,
        name: 'Unique Users',
        success: true,
        data: uniqueUserIds,
        count: uniqueUserIds.length
      });

      // Step 4: Fetch profiles
      console.log('Step 4: Fetching profiles...');
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .in('id', uniqueUserIds);

      testResults.steps.push({
        step: 4,
        name: 'User Profiles',
        success: !profileError && profiles && profiles.length > 0,
        data: profiles,
        error: profileError,
        count: profiles?.length || 0,
        warning: profiles?.length !== uniqueUserIds.length ? 
          `Expected ${uniqueUserIds.length} profiles, got ${profiles?.length || 0}` : null
      });

      if (profileError) {
        testResults.conclusion = 'FAIL: Error fetching profiles (likely RLS issue)';
        setResults(testResults);
        setLoading(false);
        return;
      }

      if (!profiles || profiles.length === 0) {
        testResults.conclusion = 'FAIL: Profiles table is empty or RLS blocking access';
        setResults(testResults);
        setLoading(false);
        return;
      }

      // Step 5: Count matches per user
      const matchCounts = new Map<string, number>();
      matchingUsers.forEach(match => {
        matchCounts.set(match.user_id, (matchCounts.get(match.user_id) || 0) + 1);
      });

      const suggestions = profiles.map(profile => ({
        ...profile,
        match_count: matchCounts.get(profile.id) || 0
      })).sort((a, b) => b.match_count - a.match_count);

      testResults.steps.push({
        step: 5,
        name: 'Final Suggestions',
        success: suggestions.length > 0,
        data: suggestions,
        count: suggestions.length
      });

      testResults.conclusion = suggestions.length > 0 
        ? `SUCCESS: Found ${suggestions.length} matching user(s)!` 
        : 'FAIL: No suggestions generated';

    } catch (error: any) {
      testResults.conclusion = 'ERROR: ' + error.message;
      testResults.steps.push({
        step: 'error',
        name: 'Exception',
        success: false,
        error: error.message
      });
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Test Matching Logic</h2>
        <p className="text-gray-600 mt-1">
          Debug tool to verify the buddy matching algorithm
        </p>
      </div>

      <button
        onClick={runTest}
        disabled={loading || !user}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Testing...' : 'Run Test'}
      </button>

      {results && (
        <div className="space-y-4">
          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">User Info</h3>
            <p className="text-sm">ID: {results.userId}</p>
            <p className="text-sm">Email: {results.email}</p>
          </div>

          {/* Steps */}
          {results.steps.map((step: any, index: number) => (
            <div 
              key={index}
              className={`rounded-lg p-4 border-2 ${
                step.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {step.success ? '✅' : '❌'} Step {step.step}: {step.name}
                  </h3>
                  {step.count !== undefined && (
                    <p className="text-sm text-gray-600 mt-1">
                      Count: {step.count}
                    </p>
                  )}
                  {step.warning && (
                    <p className="text-sm text-orange-600 mt-1 font-medium">
                      ⚠️ {step.warning}
                    </p>
                  )}
                </div>
              </div>
              
              {step.error && (
                <div className="mt-2 p-2 bg-red-100 rounded text-sm text-red-800">
                  <strong>Error:</strong> {JSON.stringify(step.error)}
                </div>
              )}
              
              {step.data && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                    View Data
                  </summary>
                  <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(step.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div className={`rounded-lg p-4 border-2 ${
            results.conclusion.startsWith('SUCCESS')
              ? 'bg-green-100 border-green-300'
              : 'bg-red-100 border-red-300'
          }`}>
            <h3 className="font-bold text-lg">
              {results.conclusion.startsWith('SUCCESS') ? '🎉' : '🔴'} {results.conclusion}
            </h3>
          </div>

          {/* Recommendations */}
          {!results.conclusion.startsWith('SUCCESS') && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">💡 Recommendations</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {results.conclusion.includes('no domains') && (
                  <li>Go to "My Domains" tab and select some domains</li>
                )}
                {results.conclusion.includes('No matching users') && (
                  <li>Other users need to select overlapping domains</li>
                )}
                {results.conclusion.includes('RLS issue') && (
                  <li>Run the <code>fix_rls_and_profiles.sql</code> script in Supabase</li>
                )}
                {results.conclusion.includes('Profiles table is empty') && (
                  <li>Run query #2 from <code>fix_rls_and_profiles.sql</code> to sync profiles</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};