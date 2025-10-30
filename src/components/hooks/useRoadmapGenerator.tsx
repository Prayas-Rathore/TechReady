import { useState } from 'react'
import { supabase } from '../../services/SupabaseClient'

export const useRoadmapGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roadmap, setRoadmap] = useState<any>(null)

  const generateRoadmap = async (assessmentData: any) => {
    setIsGenerating(true)
    setError(null)

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        'generate-roadmap',
        { body: { assessmentData } }
      )

      if (functionError) throw functionError
      if (!data.success) throw new Error(data.error)

      setRoadmap(data.roadmap)
      return data.roadmap

    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setIsGenerating(false)
    }
  }

  return { generateRoadmap, isGenerating, error, roadmap }
}