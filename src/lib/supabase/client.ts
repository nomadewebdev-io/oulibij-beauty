/**
 * Client Supabase (Stub sécurisé pour mode sans Supabase)
 * Le code complet de production est archivé dans @/lib/supabase-archive/client.ts
 */

export interface SupabaseClientStub {
  auth: {
    getUser: () => Promise<{ data: { user: null }; error: null }>
    onAuthStateChange: (_callback: (_event: string, _session: unknown) => void) => {
      data: { subscription: { unsubscribe: () => void } }
    }
    signOut: () => Promise<{ error: null }>
  }
  from: (_table: string) => {
    select: () => {
      eq: () => {
        order: () => {
          limit: () => Promise<{ data: unknown[]; error: null }>
          then: (cb: (res: { data: unknown[]; error: null }) => unknown) => Promise<unknown>
        }
        maybeSingle: () => Promise<{ data: null; error: null }>
        single: () => Promise<{ data: null; error: null }>
      }
      limit: () => Promise<{ data: unknown[]; error: null }>
    }
  }
}

export function createClient(): SupabaseClientStub {
  return {
    auth: {
      async getUser() {
        return { data: { user: null }, error: null }
      },
      onAuthStateChange(_callback) {
        return {
          data: {
            subscription: {
              unsubscribe() {},
            },
          },
        }
      },
      async signOut() {
        return { error: null }
      },
    },
    from(_table: string) {
      return {
        select() {
          return {
            eq() {
              return {
                order() {
                  return {
                    limit() {
                      return Promise.resolve({ data: [], error: null })
                    },
                    then(cb: (res: { data: unknown[]; error: null }) => unknown) {
                      return Promise.resolve({ data: [], error: null }).then(cb)
                    },
                  }
                },
                maybeSingle() {
                  return Promise.resolve({ data: null, error: null })
                },
                single() {
                  return Promise.resolve({ data: null, error: null })
                },
              }
            },
            limit() {
              return Promise.resolve({ data: [], error: null })
            },
          }
        },
      }
    },
  }
}
