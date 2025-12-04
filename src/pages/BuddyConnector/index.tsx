// src/pages/BuddyConnector/index.tsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DomainSelector } from './DomainSelector';
import { Suggestions } from './Suggestions';
import { IncomingRequests } from './IncomingRequests';
import { MyBuddies } from './MyBuddies';
import { Navigate } from 'react-router-dom';
import { PostsPage } from './Post/index';

type TabType = 'domains' | 'suggestions' | 'requests' | 'buddies'| 'post';

const tabs: { id: TabType; label: string; icon: string }[] = [
  { id: 'domains', label: 'My Domains', icon: '🎯' },
  { id: 'suggestions', label: 'Find Buddies', icon: '🔍' },
  { id: 'requests', label: 'Requests', icon: '📬' },
  { id: 'buddies', label: 'My Buddies', icon: '👥' },
  { id: 'post', label: 'Post', icon: '👥' }
];

export const BuddyConnectorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('domains');
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'domains':
        return <DomainSelector />;
      case 'suggestions':
        return <Suggestions />;
      case 'requests':
        return <IncomingRequests />;
      case 'buddies':
        return <MyBuddies />;
      case 'post':
        return <PostsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Buddy Connector</h1>
          <p className="text-gray-600 mt-2">
            Find study partners who are preparing for similar interviews
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                  border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BuddyConnectorPage;