export type StorageBucket = 'salons' | 'services' | 'staff' | 'realisations' | 'avatars'

/**
 * Upload image stub (Mode autonome sans Supabase)
 * Le code complet de production est archivé dans @/lib/supabase-archive/storage.ts
 */
export async function uploadImage(
  _bucket: StorageBucket,
  _path: string,
  _file: File
): Promise<{ url: string | null; error: string | null }> {
  return { url: '/images/hero-1.jpg', error: null }
}

export function getStoragePublicUrl(_bucket: StorageBucket, path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}
