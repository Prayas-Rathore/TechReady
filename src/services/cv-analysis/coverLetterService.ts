import { supabase } from '../SupabaseClient'
import { CoverLetterRequest, CoverLetter } from '../../types/coverLetter'
import { Profile } from '../../types/coverLetter'

// services/coverLetterService.ts
export class CoverLetterService {
  
  static async getUserProfile(userId: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  static async generateCoverLetter(request: CoverLetterRequest): Promise<{
    success: boolean
    coverLetter?: CoverLetter
    generatedText?: string
    error?: string
  }> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('Not authenticated')
      }

      const response = await supabase.functions.invoke('generate-cover-letter', {
        body: request,
      })

      if (response.error) {
        throw response.error
      }

      return response.data
    } catch (error: any) {
      console.error('Error generating cover letter:', error)
      return {
        success: false,
        error: error.message || 'Failed to generate cover letter'
      }
    }
  }

  static async getUserCoverLetters(userId: string): Promise<CoverLetter[]> {
    try {
      const { data, error } = await supabase
        .from('cover_letters')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching cover letters:', error)
      return []
    }
  }

  static async updateCoverLetter(
    letterId: string, 
    updates: Partial<Pick<CoverLetter, 'generated_letter' | 'status'>>
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('cover_letters')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', letterId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error updating cover letter:', error)
      return false
    }
  }

  static async deleteCoverLetter(letterId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('cover_letters')
        .delete()
        .eq('id', letterId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting cover letter:', error)
      return false
    }
  }
}