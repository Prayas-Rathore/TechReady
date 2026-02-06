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
import { usePresence } from '../../hooks/usePresence';
import { useCallManager } from '../../hooks/useCallManager';
import { IncomingCallModal } from '../buddy-connector/IncomingCallModal';
import { ActiveCallUI } from '../buddy-connector/ActiveCallUI';
import { CallMinutesWidget } from '../buddy-connector/CallMinutesWidget';

type PageType = 'suggestions' | 'requests' | 'buddies' | 'post';

export const BuddyConnectorPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('buddies'); // Default to buddies to see calls
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [hasSudoName, setHasSudoName] = useState<boolean | null>(null);
  const { user, loading, isAuthenticated } = useAuth();

  // Initialize presence tracking
  usePresence();

  // Initialize call manager
  const {
    incomingCall,
    activeCall,
    initiateCall,
    answerCall,
    declineCall,
    endCall
  } = useCallManager();

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
        return <MyBuddies onCallInitiated={initiateCall} />;
      case 'post':
        return <PostsPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <SocialLayout
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as PageType)}
        pendingRequestsCount={pendingRequestsCount}
      >
        {/* Call Minutes Widget - Show at top */}
        <div className="mb-6">
          <CallMinutesWidget />
        </div>

        {renderContent()}
      </SocialLayout>

      {/* Incoming Call Modal */}
      {incomingCall && !activeCall && (
        <IncomingCallModal
          callerName={incomingCall.from_user_name}
          onAccept={answerCall}
          onDecline={declineCall}
        />
      )}

      {/* Active Call UI */}
      {activeCall && (
        <ActiveCallUI
          buddyName={activeCall.buddyName}
          room={activeCall.room}
          onEndCall={endCall}
        />
      )}
    </>
  );
};

export default BuddyConnectorPage;