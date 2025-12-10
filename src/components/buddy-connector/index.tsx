import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Suggestions } from './Suggestions';
import { IncomingRequests } from './IncomingRequests';
import { MyBuddies } from './MyBuddies';
import { Navigate } from 'react-router-dom';
import { PostsPage } from './Posts';
import { SocialLayout } from './SocialLayout';
import { SetupProfile } from './SetupProfile';
import { fetchIncomingRequests } from '../../services/buddy/buddyService';
import { supabase } from '../../services/SupabaseClient';

type PageType = 'suggestions' | 'requests' | 'buddies' | 'post';

export const BuddyConnectorPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('suggestions');
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [hasSudoName, setHasSudoName] = useState<boolean | null>(null);
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (user) {
      checkSudoName();
      loadPendingRequestsCount();
    }
  }, [user]);

  const checkSudoName = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('sudo_name')
      .eq('id', user.id)
      .single();

    setHasSudoName(!!data?.sudo_name);
  };

  const loadPendingRequestsCount = async () => {
    if (!user) return;
    try {
      const requests = await fetchIncomingRequests(user.id);
      setPendingRequestsCount(requests.length);
    } catch (error) {
      console.error('Error loading pending requests count:', error);
    }
  };

  if (loading || hasSudoName === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Show setup if no sudo_name
  if (!hasSudoName) {
    return <SetupProfile />;
  }

  const renderContent = () => {
    switch (currentPage) {
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