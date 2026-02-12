import { useEffect, useState, useCallback } from 'react';
import { Room, RoomEvent, Track } from 'livekit-client';
import { supabase } from '../services/SupabaseClient';
import { livekitService } from '../services/livekit/livekitService';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

/* ---------------- TYPES ---------------- */

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
  roomName: string;
  buddyName: string;
}

/* ---------------- AUDIO ---------------- */

function attachAudio(track: Track, identity: string) {
  const el = track.attach() as HTMLAudioElement;
  el.autoplay = true;
  el.id = `audio-${identity}`;
  document.body.appendChild(el);
}

/* ---------------- HOOK ---------------- */

export const useCallManager = () => {
  const { user } = useAuth();

  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isCalling, setIsCalling] = useState(false);

  /* ---------- CLEANUP ---------- */
  const cleanup = useCallback(() => {
    activeCall?.room.disconnect();
    setActiveCall(null);
    setIncomingCall(null);
  }, [activeCall]);

  /* ---------- REALTIME ---------- */
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('call-signals')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'call_signals',
          filter: `to_user_id=eq.${user.id}`,
        },
        payload => {
          const call = payload.new as IncomingCall;

          if (call.status === 'ringing') {
            setIncomingCall(call);
          }

          if (call.status === 'cancelled' || call.status === 'rejected') {
            cleanup();
            toast('Call ended');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, cleanup]);

  /* ---------- ROOM ---------- */
  const setupRoom = (room: Room) => {
    room.remoteParticipants.forEach(p =>
      p.audioTrackPublications.forEach(pub => {
        if (pub.track) attachAudio(pub.track, p.identity);
      })
    );

    room.on(RoomEvent.TrackSubscribed, (track, _, p) => {
      if (track.kind === Track.Kind.Audio) {
        attachAudio(track, p.identity);
      }
    });

    room.on(RoomEvent.Disconnected, cleanup);
  };

  /* ---------- CALLER ---------- */
  const initiateCall = async (buddyId: string, buddyName: string) => {
    if (activeCall || isCalling) return;

    setIsCalling(true);
    toast.loading('Calling...', { id: 'call' });

    try {
      const { roomName, token } = await livekitService.initiateCall(buddyId);
      const room = await livekitService.joinCall(token);

      setupRoom(room);
      setActiveCall({ room, roomName, buddyName });

      toast.success('Connected', { id: 'call' });
    } catch (e: any) {
      toast.error(e.message || 'Call failed', { id: 'call' });
    } finally {
      setIsCalling(false);
    }
  };

  /* ---------- ANSWER ---------- */
  const answerCall = async () => {
    if (!incomingCall) return;

    const room = await livekitService.answerCall(
      incomingCall.id,
      incomingCall.room_name
    );

    setupRoom(room);
    setActiveCall({
      room,
      roomName: incomingCall.room_name,
      buddyName: incomingCall.from_user_name,
    });

    setIncomingCall(null);
  };

  /* ---------- DECLINE ---------- */
  const declineCall = async () => {
    if (!incomingCall) return;

    await supabase
      .from('call_signals')
      .update({ status: 'rejected' })
      .eq('id', incomingCall.id);

    setIncomingCall(null);
  };

  /* ---------- END ---------- */
  const endCall = async () => {
    if (!activeCall) return;

    await livekitService.endCall(activeCall.roomName, activeCall.room);
    cleanup();
  };

  return {
    incomingCall,
    activeCall,
    isCalling,
    initiateCall,
    answerCall,
    declineCall,
    endCall,
  };
};
