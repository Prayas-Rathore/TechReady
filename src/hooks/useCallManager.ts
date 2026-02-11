import { useState, useEffect, useCallback } from 'react';
import { Room, RoomEvent, Track } from 'livekit-client';
import { supabase } from '../services/SupabaseClient';
import { livekitService } from '../services/livekit/livekitService';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

interface IncomingCall {
  id: string;
  from_user_id: string;
  from_user_name: string;
  room_name: string;
  call_token: string;
  status: 'ringing' | 'accepted' | 'rejected' | 'missed' | 'cancelled';
}

interface ActiveCall {
  room: Room;
  buddyName: string;
  callLogId: string;
  startTime: Date;
}

export const useCallManager = () => {
  const { user } = useAuth();
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isInitiatingCall, setIsInitiatingCall] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Subscribe to incoming calls
    const channel = supabase
      .channel('call-signals')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'call_signals',
          filter: `to_user_id=eq.${user.id}`
        },
        (payload) => {
          const call = payload.new as IncomingCall;
          if (call.status === 'ringing') {
            setIncomingCall(call);
            // Play ringtone sound here
            playRingtone();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const playRingtone = () => {
    // You can add actual ringtone audio here
    // const audio = new Audio('/ringtone.mp3');
    // audio.loop = true;
    // audio.play();
  };

  const stopRingtone = () => {
    // Stop ringtone audio
  };

  // Initiate outgoing call
  const initiateCall = useCallback(async (buddyId: string, buddyName: string) => {
    if (activeCall || isInitiatingCall) {
      toast.error('Already in a call');
      return;
    }

    setIsInitiatingCall(true);
    try {
      toast.loading('Calling...', { id: 'calling' });

      // Initiate call and get token
      const { roomName, token, callLogId } = await livekitService.initiateCall(buddyId, buddyName);

      // Join room
      const room = await livekitService.joinCall(token);

      // Set up room event listeners
      setupRoomListeners(room);

      setActiveCall({
        room,
        buddyName,
        callLogId,
        startTime: new Date()
      });

      toast.success('Connected!', { id: 'calling' });
    } catch (error: any) {
      console.error('Failed to initiate call:', error);
      toast.error(error.message || 'Failed to start call', { id: 'calling' });
    } finally {
      setIsInitiatingCall(false);
    }
  }, [activeCall, isInitiatingCall]);

// Answer incoming call
const answerCall = useCallback(async () => {
  if (!incomingCall || activeCall) return;

  try {
    stopRingtone();
    toast.loading('Connecting...', { id: 'answering' });

    console.log('📞 Answering call...');
    
    const { room } = await livekitService.answerCall(
      incomingCall.id,
      incomingCall.room_name
    );

    console.log('✅ Room joined, setting up listeners...');
    setupRoomListeners(room);

    setActiveCall({
      room,
      buddyName: incomingCall.from_user_name,
      callLogId: '',
      startTime: new Date()
    });

    setIncomingCall(null);
    
    // Force play all audio elements after a delay
    setTimeout(() => {
      console.log('🔊 Forcing audio playback...');
      document.querySelectorAll('audio').forEach(async (audio) => {
        audio.muted = false;
        audio.volume = 1.0;
        try {
          await audio.play();
          console.log('✅ Audio playing');
        } catch (e) {
          console.warn('⚠️ Autoplay blocked, tap screen');
        }
      });
    }, 1000);

    toast.success('Call connected!', { id: 'answering' });
    
  } catch (error: any) {
    console.error('Failed to answer call:', error);
    toast.error(error.message || 'Failed to answer call', { id: 'answering' });
  }
}, [incomingCall, activeCall]);

  // Decline incoming call
  const declineCall = useCallback(async () => {
    if (!incomingCall) return;

    try {
      stopRingtone();
      await livekitService.declineCall(incomingCall.id);
      setIncomingCall(null);
      toast('Call declined');
    } catch (error) {
      console.error('Failed to decline call:', error);
    }
  }, [incomingCall]);

  // End active call
  const endCall = useCallback(async () => {
    if (!activeCall) return;

    try {
      await livekitService.endCall(
        activeCall.room,
        activeCall.callLogId,
        activeCall.startTime
      );
      
      setActiveCall(null);
      toast.success('Call ended');
    } catch (error) {
      console.error('Failed to end call:', error);
      toast.error('Failed to end call properly');
      setActiveCall(null);
    }
  }, [activeCall]);

// Setup room event listeners
const setupRoomListeners = (room: Room) => {
  console.log('🎧 Setting up room listeners');

  room.on(RoomEvent.Disconnected, () => {
    console.log('📴 Room disconnected');
    setActiveCall(null);
    toast('Call disconnected');
  });

  room.on(RoomEvent.ParticipantConnected, (participant) => {
    console.log('✅ Participant connected:', participant.identity);
    toast.success('Connected!');
  });

  room.on(RoomEvent.TrackSubscribed, async (track, _publication, participant) => {
    console.log('🎵 Track subscribed:', track.kind, 'from', participant.identity);
    
    if (track.kind === Track.Kind.Audio) {
      const audioElement = track.attach();
      
      // Set audio properties
      audioElement.autoplay = true;
      audioElement.volume = 1.0;
      audioElement.muted = false;
      audioElement.setAttribute('playsinline', '');
      
      // Add to DOM
      document.body.appendChild(audioElement);
      
      console.log('🔊 Audio element attached, attempting to play...');
      
      // Force play with error handling
      try {
        await audioElement.play();
        console.log('✅ Audio playing successfully!');
      } catch (err: any) {
        console.warn('⚠️ Autoplay blocked, waiting for user interaction:', err.message);
        
        // If blocked, play on next user interaction
        const playOnInteraction = async () => {
          try {
            await audioElement.play();
            console.log('✅ Audio started after user interaction');
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          } catch (e) {
            console.error('Failed to play audio:', e);
          }
        };
        
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        
        toast('Tap screen to enable audio', { duration: 3000 });
      }
      
      // Debug: Log audio element state
      setTimeout(() => {
        console.log('Audio element state:', {
          paused: audioElement.paused,
          muted: audioElement.muted,
          volume: audioElement.volume,
          readyState: audioElement.readyState
        });
      }, 1000);
    }
  });

  room.on(RoomEvent.TrackUnsubscribed, (track) => {
    console.log('🔇 Track unsubscribed:', track.kind);
    track.detach().forEach(element => element.remove());
  });
};

  return {
    incomingCall,
    activeCall,
    isInitiatingCall,
    initiateCall,
    answerCall,
    declineCall,
    endCall
  };
};