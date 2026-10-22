/**
 * Client Supabase Serveur (Stub sécurisé pour mode sans Supabase)
 * Le code complet de production est archivé dans @/lib/supabase-archive/server.ts
 */

export async function createClient() {
  return {
    auth: {
      async getUser() {
        return { data: { user: null }, error: null }
      },
    },
    from(_table: string) {
      return {
        select() {
          return {
            eq() {
              return {
                maybeSingle() {
                  return Promise.resolve({ data: null, error: null })
                },
                single() {
                  return Promise.resolve({ data: null, error: null })
                },
              }
            },
            maybeSingle() {
              return Promise.resolve({ data: null, error: null })
            },
          }
        },
      }
    },
  } as any
}
