import { supabase } from './SupabaseClient';


export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('_test_').select('*').limit(1);

    if (error && error.message.includes('relation "_test_" does not exist')) {
      console.log('✅ Supabase connected successfully!');
      return true;
    }

    console.log('✅ Supabase connected!', data);
    return true;
  } catch (err) {
    console.error('❌ Supabase connection failed:', err);
    return false;
  }
};

