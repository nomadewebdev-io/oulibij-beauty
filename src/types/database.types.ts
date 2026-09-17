export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      salons: {
        Row: {
          id: string
          nom: string
          description: string | null
          adresse: string | null
          code_postal: string | null
          ville: string | null
          telephone: string | null
          email: string | null
          logo_url: string | null
          cover_image_url: string | null
          horaires_ouverture: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nom: string
          description?: string | null
          adresse?: string | null
          code_postal?: string | null
          ville?: string | null
          telephone?: string | null
          email?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          horaires_ouverture?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nom?: string
          description?: string | null
          adresse?: string | null
          code_postal?: string | null
          ville?: string | null
          telephone?: string | null
          email?: string | null
          logo_url?: string | null
          cover_image_url?: string | null
          horaires_ouverture?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          salon_id: string | null
          email: string | null
          full_name: string | null
          telephone: string | null
          role: 'client' | 'staff' | 'admin'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          salon_id?: string | null
          email?: string | null
          full_name?: string | null
          telephone?: string | null
          role?: 'client' | 'staff' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string | null
          email?: string | null
          full_name?: string | null
          telephone?: string | null
          role?: 'client' | 'staff' | 'admin'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          id: string
          salon_id: string
          nom: string
          description: string | null
          categorie: string
          duree_minutes: number
          prix: number
          image_url: string | null
          is_active: boolean
          necessite_essai: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          nom: string
          description?: string | null
          categorie?: string
          duree_minutes?: number
          prix?: number
          image_url?: string | null
          is_active?: boolean
          necessite_essai?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          nom?: string
          description?: string | null
          categorie?: string
          duree_minutes?: number
          prix?: number
          image_url?: string | null
          is_active?: boolean
          necessite_essai?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          }
        ]
      }
      staff: {
        Row: {
          id: string
          salon_id: string
          user_id: string | null
          nom: string
          prenom: string
          specialite: string | null
          bio: string | null
          avatar_url: string | null
          email: string | null
          telephone: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          user_id?: string | null
          nom: string
          prenom: string
          specialite?: string | null
          bio?: string | null
          avatar_url?: string | null
          email?: string | null
          telephone?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          user_id?: string | null
          nom?: string
          prenom?: string
          specialite?: string | null
          bio?: string | null
          avatar_url?: string | null
          email?: string | null
          telephone?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          }
        ]
      }
      disponibilites: {
        Row: {
          id: string
          salon_id: string
          staff_id: string
          jour_semaine: number
          heure_debut: string
          heure_fin: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          staff_id: string
          jour_semaine: number
          heure_debut: string
          heure_fin: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          staff_id?: string
          jour_semaine?: number
          heure_debut?: string
          heure_fin?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "disponibilites_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disponibilites_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          }
        ]
      }
      rendez_vous: {
        Row: {
          id: string
          salon_id: string
          client_id: string | null
          staff_id: string | null
          service_id: string | null
          client_nom: string | null
          client_email: string | null
          client_telephone: string | null
          date_heure_debut: string
          date_heure_fin: string
          statut: 'en_attente' | 'confirme' | 'annule' | 'termine'
          notes_client: string | null
          notes_salon: string | null
          prix_total: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          client_id?: string | null
          staff_id?: string | null
          service_id?: string | null
          client_nom?: string | null
          client_email?: string | null
          client_telephone?: string | null
          date_heure_debut: string
          date_heure_fin: string
          statut?: 'en_attente' | 'confirme' | 'annule' | 'termine'
          notes_client?: string | null
          notes_salon?: string | null
          prix_total?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          client_id?: string | null
          staff_id?: string | null
          service_id?: string | null
          client_nom?: string | null
          client_email?: string | null
          client_telephone?: string | null
          date_heure_debut?: string
          date_heure_fin?: string
          statut?: 'en_attente' | 'confirme' | 'annule' | 'termine'
          notes_client?: string | null
          notes_salon?: string | null
          prix_total?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rendez_vous_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rendez_vous_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rendez_vous_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rendez_vous_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      realisations: {
        Row: {
          id: string
          salon_id: string
          staff_id: string | null
          titre: string
          description: string | null
          image_url: string
          categorie: string | null
          date_realisation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          salon_id: string
          staff_id?: string | null
          titre: string
          description?: string | null
          image_url: string
          categorie?: string | null
          date_realisation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          salon_id?: string
          staff_id?: string | null
          titre?: string
          description?: string | null
          image_url?: string
          categorie?: string | null
          date_realisation?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "realisations_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "realisations_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          }
        ]
      }
      messages_contact: {
        Row: {
          id: string
          salon_id: string | null
          nom: string
          email: string
          telephone: string | null
          sujet: string | null
          message: string
          lu: boolean
          created_at: string
        }
        Insert: {
          id?: string
          salon_id?: string | null
          nom: string
          email: string
          telephone?: string | null
          sujet?: string | null
          message: string
          lu?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          salon_id?: string | null
          nom?: string
          email?: string
          telephone?: string | null
          sujet?: string | null
          message?: string
          lu?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_contact_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "salons"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_staff_or_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
