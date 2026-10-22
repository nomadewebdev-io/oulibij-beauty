import { createClient } from './client'

export type StorageBucket = 'salons' | 'services' | 'staff' | 'realisations' | 'avatars'

/**
 * Upload an image to a Supabase storage bucket
 */
export async function uploadImage(
  bucket: StorageBucket,
  path: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    return { url: null, error: error.message }
  }

  const { data: publicData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return { url: publicData.publicUrl, error: null }
}

/**
 * Get public URL for a file in a Supabase storage bucket
 */
export function getStoragePublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
