import { supabase } from './SupabaseClient';

// Define type for answers
export interface AssessmentAnswers {
  [key: string]: string | number | boolean | null;
}

// Define guest assessment record type
export interface GuestAssessment {
  id?: string;
  anon_user_id: string;
  answers: AssessmentAnswers;
  submitted_at?: string;
  linked_to_user_id?: string | null;
  linked_at?: string | null;
}

// Save guest assessment
export const saveGuestAssessment = async (
  anonUserId: string,
  answers: AssessmentAnswers
): Promise<{ success: boolean; data?: GuestAssessment; error?: any }> => {
  try {
    console.log('💾 Saving guest assessment...', { anonUserId });

    const { data, error } = await supabase
      .from('guest_assessments')
      .insert([
        {
          anon_user_id: anonUserId,
          answers,
          submitted_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    console.log('✅ Guest assessment saved successfully!', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error saving guest assessment:', error);
    return { success: false, error };
  }
};

// Fetch guest assessment
export const getGuestAssessment = async (
  anonUserId: string
): Promise<{ success: boolean; data?: GuestAssessment | null; error?: any }> => {
  try {
    console.log('🔍 Fetching guest assessment...', { anonUserId });

    const { data, error } = await supabase
      .from('guest_assessments')
      .select('*')
      .eq('anon_user_id', anonUserId)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    console.log('✅ Found assessment:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Error fetching guest assessment:', error);
    return { success: false, error };
  }
};
