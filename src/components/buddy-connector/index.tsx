import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DomainSelector } from './DomainSelector';
import { Suggestions } from './Suggestions';
import { IncomingRequests } from './IncomingRequests';
import { MyBuddies } from './MyBuddies';
import { Navigate } from 'react-router-dom';
import { PostsPage } from './Posts';
import { SocialLayout } from './SocialLayout';
import { fetchIncomingRequests } from '../../services/buddy/buddyService';

type PageType = 'domains' | 'suggestions' | 'requests' | 'buddies' | 'post';

export const BuddyConnectorPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('post');
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (user) {
      loadPendingRequestsCount();
    }
  }, [user]);

  const loadPendingRequestsCount = async () => {
    if (!user) return;
    try {
      const requests = await fetchIncomingRequests(user.id);
      setPendingRequestsCount(requests.length);
    } catch (error) {
      console.error('Error loading pending requests count:', error);
    }
  };

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
    switch (currentPage) {
      case 'domains':
        return <DomainSelector />;
      case 'suggestions':
        return <Suggestions />;
      case 'requests':
        return <IncomingRequests onRequestUpdate={loadPendingRequestsCount} />;
      case 'buddies':
        return <MyBuddies />;
      case 'post':
        return <PostsPage />;
      default:
        return null;
    }
  };

  return (
    <SocialLayout
      currentPage={currentPage}
      onNavigate={(page) => setCurrentPage(page as PageType)}
      pendingRequestsCount={pendingRequestsCount}
    >
      {renderContent()}
    </SocialLayout>
  );
};

export default BuddyConnectorPage;