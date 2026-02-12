// src/services/livekit/livekitService.ts
import { Room } from 'livekit-client';
import { supabase } from '../SupabaseClient';

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL || 'wss://calls.mockithub.ai';
const LIVEKIT_API_KEY = import.meta.env.VITE_LIVEKIT_API_KEY || 'devkey';
const LIVEKIT_SECRET = import.meta.env.VITE_LIVEKIT_SECRET || 'devsecret123';

async function generateToken(roomName: string, identity: string, name: string): Promise<string> {
  const jsrsasign = await import('jsrsasign');
  const KJUR = jsrsasign.KJUR;
  
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600;

  const payload = {
    exp: exp,
    iss: LIVEKIT_API_KEY,
    nbf: now,
    sub: identity,
    identity: identity,
    name: name,
    video: {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true
    }
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(payload);
  
  return KJUR.jws.JWS.sign('HS256', sHeader, sPayload, { utf8: String(LIVEKIT_SECRET) });
}

export interface CallInfo {
  roomName: string;
  token: string;
  callLogId: string;
}

export const livekitService = {
  async initiateCall(buddyId: string, _buddyName: string): Promise<CallInfo> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: minutesInfo } = await supabase.rpc('check_call_minutes_available', {
      p_user_id: user.id
    });

    if (!minutesInfo) {
      throw new Error('No call minutes remaining. Please upgrade your plan.');
    }

    const roomName = `call-${Date.now()}`;
    const token = await generateToken(roomName, user.id, user.email?.split('@')[0] || 'User');

    const { data: callLog, error: logError } = await supabase
      .from('call_logs')
      .insert({
        caller_id: user.id,
        receiver_id: buddyId,
        room_name: roomName,
        status: 'initiated',
        started_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (logError) throw logError;

    const { data: profile } = await supabase
      .from('profiles')
      .select('sudo_name')
      .eq('id', user.id)
      .single();

    await supabase.from('call_signals').insert({
      from_user_id: user.id,
      to_user_id: buddyId,
      from_user_name: profile?.sudo_name || 'Someone',
      room_name: roomName,
      call_token: token,
      status: 'ringing'
    });

    return {
      roomName,
      token,
      callLogId: callLog.id
    };
  },

  async joinCall(token: string): Promise<Room> {
    console.log('🔵 Joining call...');
    
    if (!LIVEKIT_URL) {
      throw new Error('LiveKit URL not configured');
    }

    try {
      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        audioCaptureDefaults: {
          autoGainControl: true,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      console.log('Connecting to:', LIVEKIT_URL);
      await room.connect(LIVEKIT_URL, token, {
        autoSubscribe: true,
      });

      console.log('✓ Connected to room');

      // Enable microphone
      console.log('📢 Enabling microphone...');
      await room.localParticipant.setMicrophoneEnabled(true);
      console.log('✓ Microphone enabled');

      // Wait for track to publish
      await new Promise(resolve => setTimeout(resolve, 500));

      // Verify microphone is publishing
      const tracks = room.localParticipant.audioTrackPublications;
      console.log('🎤 Audio tracks publishing:', tracks.size);
      
      tracks.forEach((pub) => {
        console.log('Track:', {
          kind: pub.kind,
          muted: pub.isMuted,
          source: pub.source
        });
      });

      if (tracks.size === 0) {
        console.error('❌ WARNING: No audio tracks publishing!');
        await room.localParticipant.setMicrophoneEnabled(false);
        await new Promise(resolve => setTimeout(resolve, 200));
        await room.localParticipant.setMicrophoneEnabled(true);
        console.log('🔄 Retried microphone enable');
      }

      return room;
    } catch (error: any) {
      console.error('❌ Join call failed:', error);
      throw new Error('Failed to connect to call: ' + error.message);
    }
  },

  async answerCall(callSignalId: string, roomName: string): Promise<{ token: string; room: Room }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    await supabase
      .from('call_signals')
      .update({ status: 'accepted' })
      .eq('id', callSignalId);

    const token = await generateToken(roomName, user.id, user.email?.split('@')[0] || 'User');
    const room = await this.joinCall(token);

    return { token, room };
  },

  async declineCall(callSignalId: string): Promise<void> {
    await supabase
      .from('call_signals')
      .update({ status: 'rejected' })
      .eq('id', callSignalId);
  },

  async endCall(room: Room, callLogId: string, startTime: Date): Promise<void> {
    const endTime = new Date();
    const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    if (callLogId) {
      await supabase.from('call_logs').update({
        status: 'completed',
        duration_seconds: durationSeconds,
        ended_at: endTime.toISOString()
      }).eq('id', callLogId);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user && durationSeconds > 0) {
      await supabase.rpc('deduct_call_minutes', {
        p_user_id: user.id,
        p_seconds: durationSeconds
      });
    }

    room.disconnect();
  },

  async getCallMinutesInfo(): Promise<{ used: number; granted: number; remaining: number }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data } = await supabase.rpc('get_call_minutes_info', {
      p_user_id: user.id
    });

    if (data && data.length > 0) {
      return {
        used: data[0].minutes_used,
        granted: data[0].minutes_granted,
        remaining: data[0].minutes_remaining
      };
    }

    return { used: 0, granted: 500, remaining: 500 };
  }
};