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

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...Object.keys(groupedDomains)];

  const displayedDomains = selectedCategory === 'All'
    ? domains
    : groupedDomains[selectedCategory] || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Choose Your Interests</h2>
          <p className="text-slate-600 mt-2">
            Select areas you're passionate about to find like-minded buddies
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700">
              {selectedIds.size} selected
            </span>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedDomains.map((domain) => {
            const isSelected = selectedIds.has(domain.id);
            return (
              <button
                key={domain.id}
                onClick={() => toggleDomain(domain.id)}
                className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-blue-500 ring-offset-2 scale-95'
                    : 'hover:scale-105'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  isSelected
                    ? 'from-blue-500 via-purple-500 to-pink-500'
                    : 'from-slate-100 to-slate-200'
                } transition-all duration-300`} />

                <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                  {domain.icon && (
                    <span className="text-5xl mb-3 drop-shadow-sm">{domain.icon}</span>
                  )}
                  <span className={`text-sm font-semibold ${
                    isSelected ? 'text-white' : 'text-slate-700'
                  }`}>
                    {domain.name}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {displayedDomains.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No domains in this category</p>
          </div>
        )}

        <div className="h-20" />
      </div>

      {selectedIds.size > 0 && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-50"
          aria-label="Save interests"
        >
          {saving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      )}
    </>
  );
};