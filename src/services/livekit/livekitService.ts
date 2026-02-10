import { Room, RoomEvent, Track, RemoteParticipant } from 'livekit-client';
import { supabase } from '../SupabaseClient';

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;
const LIVEKIT_API_KEY = import.meta.env.VITE_LIVEKIT_API_KEY;
const LIVEKIT_SECRET = import.meta.env.VITE_LIVEKIT_SECRET;

// Generate JWT token client-side (for testing - move to backend for production)
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
  // Initiate a call
  async initiateCall(buddyId: string, buddyName: string): Promise<CallInfo> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check if user has minutes available
    const { data: minutesInfo } = await supabase.rpc('check_call_minutes_available', {
      p_user_id: user.id
    });

    if (!minutesInfo) {
      throw new Error('No call minutes remaining. Please upgrade your plan.');
    }

    const roomName = `call-${Date.now()}`;
    
    // Generate token
    const token = await generateToken(roomName, user.id, user.email?.split('@')[0] || 'User');

    // Create call log
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

    // Get user's profile for name
    const { data: profile } = await supabase
      .from('profiles')
      .select('sudo_name')
      .eq('id', user.id)
      .single();

    // Send call signal to buddy
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

  // Join a call
  async joinCall(token: string): Promise<Room> {
    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
    });

    await room.connect(LIVEKIT_URL, token, {
      autoSubscribe: true,
    });

    // Enable microphone only (audio call)
    await room.localParticipant.setMicrophoneEnabled(true);

    return room;
  },

  // Answer incoming call
  async answerCall(callSignalId: string, roomName: string): Promise<{ token: string; room: Room }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Update call signal status
    await supabase
      .from('call_signals')
      .update({ status: 'accepted' })
      .eq('id', callSignalId);

    // Generate token for receiver
    const token = await generateToken(roomName, user.id, user.email?.split('@')[0] || 'User');

    // Join room
    const room = await this.joinCall(token);

    return { token, room };
  },

  // Decline call
  async declineCall(callSignalId: string): Promise<void> {
    await supabase
      .from('call_signals')
      .update({ status: 'rejected' })
      .eq('id', callSignalId);
  },

  // End call
  async endCall(room: Room, callLogId: string, startTime: Date): Promise<void> {
    const endTime = new Date();
    const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    
    // Update call log
    await supabase.from('call_logs').update({
      status: 'completed',
      duration_seconds: durationSeconds,
      ended_at: endTime.toISOString()
    }).eq('id', callLogId);

    // Deduct minutes from both users
    const { data: { user } } = await supabase.auth.getUser();
    if (user && durationSeconds > 0) {
      await supabase.rpc('deduct_call_minutes', {
        p_user_id: user.id,
        p_seconds: durationSeconds
      });
    }

    // Disconnect
    room.disconnect();
  },

  // Get call minutes info
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