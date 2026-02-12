import { Room } from 'livekit-client';
import { supabase } from '../SupabaseClient';

/* ---------------- SAFE ENV ---------------- */

const LIVEKIT_URL =
  import.meta.env.VITE_LIVEKIT_URL || 'wss://calls.mockithub.ai';

const LIVEKIT_API_KEY =
  import.meta.env.VITE_LIVEKIT_API_KEY || 'devkey';

const LIVEKIT_SECRET =
  import.meta.env.VITE_LIVEKIT_SECRET || 'devsecret';

/* ---------------- TOKEN ---------------- */

async function generateToken(
  roomName: string,
  identity: string,
  name: string
): Promise<string> {
  const jsrsasign = await import('jsrsasign');
  const { KJUR } = jsrsasign;

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    exp: now + 3600,
    iss: LIVEKIT_API_KEY,
    nbf: now,
    sub: identity,
    identity,
    name,
    video: {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    },
  };

  return KJUR.jws.JWS.sign(
    'HS256',
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
    JSON.stringify(payload),
    { utf8: LIVEKIT_SECRET }
  );
}

/* ---------------- SERVICE ---------------- */

export const livekitService = {
  /* ---------- MINUTES (RESTORED) ---------- */
  async getCallMinutesInfo(): Promise<{
    used: number;
    granted: number;
    remaining: number;
  }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase.rpc('get_call_minutes_info', {
      p_user_id: user.id,
    });

    if (error) throw error;

    if (data && data.length > 0) {
      return {
        used: data[0].minutes_used,
        granted: data[0].minutes_granted,
        remaining: data[0].minutes_remaining,
      };
    }

    return { used: 0, granted: 0, remaining: 0 };
  },

  /* ---------- CALLER ---------- */
  async initiateCall(buddyId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const roomName = `call-${Date.now()}`;

    const token = await generateToken(
      roomName,
      user.id,
      user.email?.split('@')[0] || 'User'
    );

    await supabase.from('call_signals').insert({
      from_user_id: user.id,
      to_user_id: buddyId,
      room_name: roomName,
      call_token: token,
      status: 'ringing',
    });

    return { roomName, token };
  },

  /* ---------- JOIN ---------- */
  async joinCall(token: string): Promise<Room> {
    const room = new Room({
      adaptiveStream: true,
      dynacast: true,
      audioCaptureDefaults: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    await room.connect(LIVEKIT_URL, token, { autoSubscribe: true });
    await room.localParticipant.setMicrophoneEnabled(true);

    return room;
  },

  /* ---------- ANSWER ---------- */
  async answerCall(callSignalId: string, roomName: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    await supabase
      .from('call_signals')
      .update({ status: 'accepted' })
      .eq('id', callSignalId);

    const token = await generateToken(
      roomName,
      user.id,
      user.email?.split('@')[0] || 'User'
    );

    const room = await this.joinCall(token);
    return room;
  },

  /* ---------- END / CANCEL ---------- */
  async endCall(roomName: string, room?: Room) {
    await supabase
      .from('call_signals')
      .update({ status: 'cancelled' })
      .eq('room_name', roomName);

    room?.disconnect();
  },
};
