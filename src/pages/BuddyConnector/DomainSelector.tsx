// src/pages/BuddyConnector/DomainSelector.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Domain } from '../../types/buddy.types';
import { fetchDomains, fetchUserDomains, saveUserDomains } from '../../services/buddy/buddyService';
import toast from 'react-hot-toast';

export const DomainSelector: React.FC = () => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      const [allDomains, userDomainIds] = await Promise.all([
        fetchDomains(),
        fetchUserDomains(user.id)
      ]);
      
      setDomains(allDomains);
      setSelectedIds(new Set(userDomainIds));
    } catch (error) {
      console.error('Error loading domains:', error);
      toast.error('Failed to load domains');
    } finally {
      setLoading(false);
    }
  };

  const toggleDomain = (domainId: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(domainId)) {
        newSet.delete(domainId);
      } else {
        newSet.add(domainId);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await saveUserDomains(user.id, Array.from(selectedIds));
      toast.success('Domains saved successfully!');
    } catch (error) {
      console.error('Error saving domains:', error);
      toast.error('Failed to save domains');
    } finally {
      setSaving(false);
    }
  };

  // Group domains by category
  const groupedDomains = domains.reduce((acc, domain) => {
    const category = domain.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(domain);
    return acc;
  }, {} as Record<string, Domain[]>);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Select Your Domains</h2>
        <p className="text-gray-600 mt-1">
          Choose the areas you're preparing for. We'll match you with buddies who share these interests.
        </p>
      </div>

      {Object.entries(groupedDomains).map(([category, categoryDomains]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {categoryDomains.map((domain) => {
              const isSelected = selectedIds.has(domain.id);
              return (
                <button
                  key={domain.id}
                  onClick={() => toggleDomain(domain.id)}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200 border-2
                    ${isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                    }
                  `}
                >
                  {domain.icon && <span className="mr-2">{domain.icon}</span>}
                  {domain.name}
                  {isSelected && (
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between pt-4 border-t">
        <p className="text-sm text-gray-600">
          {selectedIds.size} domain{selectedIds.size !== 1 ? 's' : ''} selected
        </p>
        <button
          onClick={handleSave}
          disabled={saving || selectedIds.size === 0}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Saving...' : 'Save Domains'}
        </button>
      </div>
    </div>
  );
};