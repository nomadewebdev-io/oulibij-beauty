/**
 * Client Supabase (Stub sécurisé pour mode sans Supabase)
 * Le code complet de production est archivé dans @/lib/supabase-archive/client.ts
 */

export function createClient() {
  return {
    auth: {
      async getUser() {
        return { data: { user: null }, error: null }
      },
      onAuthStateChange(_callback: any) {
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
                    then(cb: any) {
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
  } as any
}
