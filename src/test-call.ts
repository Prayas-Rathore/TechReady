import { supabase } from './services/SupabaseClient';

export async function testCallSetup() {
  console.log('=== Testing Call Setup ===');

  // Test 1: Auth
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log('1. Auth:', user ? '✓ OK' : '✗ FAIL', authError?.message);

  if (!user) return;

  // Test 2: Check minutes RPC
  const { data: minutes, error: minutesError } = await supabase.rpc('check_call_minutes_available', {
    p_user_id: user.id
  });
  console.log('2. Minutes RPC:', minutes !== undefined ? '✓ OK' : '✗ FAIL', minutesError?.message);

  // Test 3: Insert call log
  const { data: log, error: logError } = await supabase
    .from('call_logs')
    .insert({
      caller_id: user.id,
      receiver_id: user.id, // same user for test
      room_name: 'test-room',
      status: 'initiated',
      started_at: new Date().toISOString()
    })
    .select('id')
    .single();
  console.log('3. Call Log:', log ? '✓ OK' : '✗ FAIL', logError?.message);

  // Test 4: Insert call signal
  const { error: signalError } = await supabase.from('call_signals').insert({
    from_user_id: user.id,
    to_user_id: user.id,
    from_user_name: 'Test',
    room_name: 'test-room',
    call_token: 'test-token',
    status: 'ringing'
  });
  console.log('4. Call Signal:', signalError ? '✗ FAIL' : '✓ OK', signalError?.message);

  // Test 5: Env variables
  console.log('5. Env Variables:');
  console.log('   LIVEKIT_URL:', import.meta.env.VITE_LIVEKIT_URL || '✗ MISSING');
  console.log('   API_KEY:', import.meta.env.VITE_LIVEKIT_API_KEY || '✗ MISSING');
  console.log('   SECRET:', import.meta.env.VITE_LIVEKIT_SECRET || '✗ MISSING');
}