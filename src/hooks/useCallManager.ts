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
  startTime: Date | null;
  roomName: string;
}

function attachAudioTrack(track: Track, identity: string) {
  const el = track.attach() as HTMLAudioElement;
  el.autoplay = true;
  el.muted = false;
  el.volume = 1;
  el.setAttribute('playsinline', '');
  el.id = `audio-${identity}`;
  document.body.appendChild(el);

  el.play().catch(() => {
    const resume = () => {
      el.play().catch(() => {});
      document.removeEventListener('click', resume);
      document.removeEventListener('touchstart', resume);
    };
    document.addEventListener('click', resume, { once: true });
    document.addEventListener('touchstart', resume, { once: true });
  });

  console.log('🔊 Audio attached for', identity);
}

export const useCallManager = () => {
  const { user } = useAuth();
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isInitiatingCall, setIsInitiatingCall] = useState(false);

  // Incoming call listener
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('call-signals')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'call_signals',
          filter: `to_user_id=eq.${user.id}`,
        },
        (payload) => {
          const call = payload.new as IncomingCall;
          if (call.status === 'ringing') {
            setIncomingCall(call);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Listen for call end signals
  useEffect(() => {
    if (!user || !activeCall) return;

    const channel = supabase
      .channel(`call-end-${activeCall.roomName}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'call_logs',
          filter: `room_name=eq.${activeCall.roomName}`,
        },
        (payload) => {
          const updated = payload.new as any;
          if (updated.status === 'completed') {
            console.log('✅ Call ended by other party');
            setActiveCall(null);
            toast('Call ended');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, activeCall?.roomName]);

  // Setup room listeners
  const setupRoomListeners = (room: Room, setStartTime: (time: Date) => void) => {
    console.log('🎧 Setting up room listeners');

    // Attach already-published tracks
    room.remoteParticipants.forEach((participant) => {
      participant.audioTrackPublications.forEach((pub) => {
        if (pub.track) {
          attachAudioTrack(pub.track, participant.identity);
        }
      });
    });

    // Start timer when other participant connects
    room.on(RoomEvent.ParticipantConnected, (participant) => {
      console.log('✅ Participant connected:', participant.identity);
      
      const callStartTime = new Date();
      setStartTime(callStartTime);
      console.log('⏱️ Call timer started at:', callStartTime.toISOString());
      
      toast.success('Connected!');
    });

    room.on(RoomEvent.ParticipantDisconnected, (participant) => {
      console.log('❌ Participant disconnected:', participant.identity);
      toast('Other user left the call');
      
      setTimeout(() => {
        setActiveCall(null);
      }, 500);
    });

    room.on(RoomEvent.TrackSubscribed, (track, _pub, participant) => {
      if (track.kind === Track.Kind.Audio) {
        attachAudioTrack(track, participant.identity);
      }
    });

    room.on(RoomEvent.TrackUnsubscribed, (track) => {
      track.detach().forEach(el => el.remove());
    });

    room.on(RoomEvent.Disconnected, () => {
      console.log('📴 Room disconnected');
      setActiveCall(null);
      toast('Call ended');
    });

    room.on(RoomEvent.Reconnecting, () => {
      console.log('🔄 Reconnecting...');
      toast.loading('Reconnecting...', { id: 'reconnect' });
    });

    room.on(RoomEvent.Reconnected, () => {
      console.log('✅ Reconnected');
      toast.success('Reconnected', { id: 'reconnect' });
    });
  };

  // Initiate call
  const initiateCall = useCallback(async (buddyId: string, buddyName: string) => {
    if (activeCall || isInitiatingCall) {
      toast.error('Already in a call');
      return;
    }

    setIsInitiatingCall(true);

    try {
      toast.loading('Calling...', { id: 'calling' });

      const { roomName, token, callLogId } = await livekitService.initiateCall(
        buddyId,
        buddyName
      );

      const room = await livekitService.joinCall(token);

      const newCall: ActiveCall = {
        room,
        buddyName,
        callLogId,
        startTime: null,
        roomName,
      };

      setActiveCall(newCall);

      setupRoomListeners(room, (time: Date) => {
        setActiveCall(prev => prev ? { ...prev, startTime: time } : null);
      });

      toast.success('Ringing...', { id: 'calling' });
    } catch (e: any) {
      toast.error(e.message || 'Failed to start call', { id: 'calling' });
    } finally {
      setIsInitiatingCall(false);
    }
  }, [activeCall, isInitiatingCall]);

  // Answer call
  const answerCall = useCallback(async () => {
    if (!incomingCall || activeCall) return;

    try {
      toast.loading('Connecting...', { id: 'answering' });

      const { room } = await livekitService.answerCall(
        incomingCall.id,
        incomingCall.room_name
      );

      const callStartTime = new Date();

      const newCall: ActiveCall = {
        room,
        buddyName: incomingCall.from_user_name,
        callLogId: '',
        startTime: callStartTime,
        roomName: incomingCall.room_name,
      };

      setActiveCall(newCall);

      setupRoomListeners(room, (time: Date) => {
        setActiveCall(prev => prev && !prev.startTime ? { ...prev, startTime: time } : prev);
      });

      setIncomingCall(null);
      toast.success('Connected', { id: 'answering' });
    } catch (e: any) {
      toast.error(e.message || 'Failed to answer call', { id: 'answering' });
    }
  }, [incomingCall, activeCall]);

  // Decline call
  const declineCall = useCallback(async () => {
    if (!incomingCall) return;

    await livekitService.declineCall(incomingCall.id);
    setIncomingCall(null);
    toast('Call declined');
  }, [incomingCall]);

  // End call
  const endCall = useCallback(async () => {
    if (!activeCall) return;

    console.log('🔴 Ending call...');

    try {
      if (activeCall.startTime) {
        await livekitService.endCall(
          activeCall.room,
          activeCall.callLogId,
          activeCall.startTime
        );
      } else {
        console.log('⚠️ Call ended before connection');
        activeCall.room.disconnect();
      }

      setActiveCall(null);
      toast.success('Call ended');
    } catch (error) {
      console.error('Error ending call:', error);
      setActiveCall(null);
      activeCall.room.disconnect();
    }
  }, [activeCall]);

  return {
    incomingCall,
    activeCall,
    isInitiatingCall,
    initiateCall,
    answerCall,
    declineCall,
    endCall,
  };
};