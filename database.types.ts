export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  api: {
    Tables: {
      buyers: {
        Row: {
          buyer_address1: string | null
          buyer_address2: string | null
          buyer_city: string | null
          buyer_country: string | null
          buyer_email: string
          buyer_first_name: string
          buyer_ip_address: string | null
          buyer_name: string
          buyer_postcode: string | null
          buyer_region: string | null
          created_at: string
          id: number
          updated_at: string | null
        }
        Insert: {
          buyer_address1?: string | null
          buyer_address2?: string | null
          buyer_city?: string | null
          buyer_country?: string | null
          buyer_email: string
          buyer_first_name: string
          buyer_ip_address?: string | null
          buyer_name: string
          buyer_postcode?: string | null
          buyer_region?: string | null
          created_at?: string
          id?: number
          updated_at?: string | null
        }
        Update: {
          buyer_address1?: string | null
          buyer_address2?: string | null
          buyer_city?: string | null
          buyer_country?: string | null
          buyer_email?: string
          buyer_first_name?: string
          buyer_ip_address?: string | null
          buyer_name?: string
          buyer_postcode?: string | null
          buyer_region?: string | null
          created_at?: string
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          buyer_id: number | null
          cart_item_id: number
          completed_checkout_at: string
          created_at: string
          download_attempts: number
          id: number
          license_type: string | null
          limit_to_single_qty_in_cart: boolean
          member_types: string[] | null
          name: string
          order_id: number
          price_is_minimum: boolean
          product_id: number
          product_price: string | null
          product_type: string | null
          quantity: number | null
          shopify_variant_id: string | null
          total_price: string
          unit_price: string
          update_message: string | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          buyer_id?: number | null
          cart_item_id: number
          completed_checkout_at: string
          created_at?: string
          download_attempts: number
          id?: number
          license_type?: string | null
          limit_to_single_qty_in_cart: boolean
          member_types?: string[] | null
          name: string
          order_id: number
          price_is_minimum: boolean
          product_id: number
          product_price?: string | null
          product_type?: string | null
          quantity?: number | null
          shopify_variant_id?: string | null
          total_price: string
          unit_price: string
          update_message?: string | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          buyer_id?: number | null
          cart_item_id?: number
          completed_checkout_at?: string
          created_at?: string
          download_attempts?: number
          id?: number
          license_type?: string | null
          limit_to_single_qty_in_cart?: boolean
          member_types?: string[] | null
          name?: string
          order_id?: number
          price_is_minimum?: boolean
          product_id?: number
          product_price?: string | null
          product_type?: string | null
          quantity?: number | null
          shopify_variant_id?: string | null
          total_price?: string
          unit_price?: string
          update_message?: string | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
        ]
      }
      licenses: {
        Row: {
          buyer_id: number | null
          created_at: string
          description_summary_points: string[]
          id: number
          image: Json
          license_id: number
          license_key: string
          license_type: string
          limit_to_single_qty_in_cart: boolean
          member_types: string[]
          name: string
          order_id: number | null
          price: string
          price_is_minimum: boolean
          product_description: string
          product_id: number
          product_type: string
          shopify_variant_id: string | null
          update_message: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_id?: number | null
          created_at?: string
          description_summary_points: string[]
          id?: number
          image: Json
          license_id: number
          license_key: string
          license_type: string
          limit_to_single_qty_in_cart: boolean
          member_types: string[]
          name: string
          order_id?: number | null
          price: string
          price_is_minimum: boolean
          product_description: string
          product_id: number
          product_type: string
          shopify_variant_id?: string | null
          update_message?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_id?: number | null
          created_at?: string
          description_summary_points?: string[]
          id?: number
          image?: Json
          license_id?: number
          license_key?: string
          license_type?: string
          limit_to_single_qty_in_cart?: boolean
          member_types?: string[]
          name?: string
          order_id?: number | null
          price?: string
          price_is_minimum?: boolean
          product_description?: string
          product_id?: number
          product_type?: string
          shopify_variant_id?: string | null
          update_message?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "licenses_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          access_allowed: boolean
          billing_address1: string | null
          billing_address2: string | null
          billing_city: string | null
          billing_country: string | null
          billing_postcode: string | null
          billing_region: string | null
          business_name: string | null
          business_vat_number: string | null
          buyer_id: number | null
          created_at: string
          discount_code: string | null
          dispatched_at: string | null
          download_url: string | null
          errors: string[] | null
          eu_resolved_country: string | null
          eu_reverse_charge: string | null
          for_subscription: boolean | null
          gateway: string | null
          gift_deliver_at: string | null
          gift_order: boolean
          giftee_email: string | null
          giftee_name: string | null
          id: number
          id_string: string | null
          is_pre_sale: boolean
          is_redeemed: boolean
          next_payment_date: string | null
          order_checkout_url: string | null
          order_custom_checkout_fields: Json[] | null
          order_state: string
          payment_method: string | null
          paypal_email: string | null
          price_at_checkout: string | null
          product_update_consent_url: string | null
          receiver_email: string | null
          receiver_first_name: string | null
          receiver_name: string | null
          refunded: boolean
          send_update_emails: boolean
          sendowl_order_id: number
          settled_currency: string
          settled_gateway_fee: number | null
          settled_gross: number | null
          state: string | null
          subscription_management_url: string | null
          tag: string | null
          test_mode: boolean
          transactions: Json[] | null
          unsubscribe_url: string | null
          updated_at: string
          user_redeemed_id: string | null
          validity_statement: string | null
          verification_status: Json | null
          voucher_created_at: string
        }
        Insert: {
          access_allowed?: boolean
          billing_address1?: string | null
          billing_address2?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postcode?: string | null
          billing_region?: string | null
          business_name?: string | null
          business_vat_number?: string | null
          buyer_id?: number | null
          created_at?: string
          discount_code?: string | null
          dispatched_at?: string | null
          download_url?: string | null
          errors?: string[] | null
          eu_resolved_country?: string | null
          eu_reverse_charge?: string | null
          for_subscription?: boolean | null
          gateway?: string | null
          gift_deliver_at?: string | null
          gift_order: boolean
          giftee_email?: string | null
          giftee_name?: string | null
          id?: number
          id_string?: string | null
          is_pre_sale: boolean
          is_redeemed?: boolean
          next_payment_date?: string | null
          order_checkout_url?: string | null
          order_custom_checkout_fields?: Json[] | null
          order_state: string
          payment_method?: string | null
          paypal_email?: string | null
          price_at_checkout?: string | null
          product_update_consent_url?: string | null
          receiver_email?: string | null
          receiver_first_name?: string | null
          receiver_name?: string | null
          refunded: boolean
          send_update_emails: boolean
          sendowl_order_id: number
          settled_currency: string
          settled_gateway_fee?: number | null
          settled_gross?: number | null
          state?: string | null
          subscription_management_url?: string | null
          tag?: string | null
          test_mode: boolean
          transactions?: Json[] | null
          unsubscribe_url?: string | null
          updated_at?: string
          user_redeemed_id?: string | null
          validity_statement?: string | null
          verification_status?: Json | null
          voucher_created_at: string
        }
        Update: {
          access_allowed?: boolean
          billing_address1?: string | null
          billing_address2?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postcode?: string | null
          billing_region?: string | null
          business_name?: string | null
          business_vat_number?: string | null
          buyer_id?: number | null
          created_at?: string
          discount_code?: string | null
          dispatched_at?: string | null
          download_url?: string | null
          errors?: string[] | null
          eu_resolved_country?: string | null
          eu_reverse_charge?: string | null
          for_subscription?: boolean | null
          gateway?: string | null
          gift_deliver_at?: string | null
          gift_order?: boolean
          giftee_email?: string | null
          giftee_name?: string | null
          id?: number
          id_string?: string | null
          is_pre_sale?: boolean
          is_redeemed?: boolean
          next_payment_date?: string | null
          order_checkout_url?: string | null
          order_custom_checkout_fields?: Json[] | null
          order_state?: string
          payment_method?: string | null
          paypal_email?: string | null
          price_at_checkout?: string | null
          product_update_consent_url?: string | null
          receiver_email?: string | null
          receiver_first_name?: string | null
          receiver_name?: string | null
          refunded?: boolean
          send_update_emails?: boolean
          sendowl_order_id?: number
          settled_currency?: string
          settled_gateway_fee?: number | null
          settled_gross?: number | null
          state?: string | null
          subscription_management_url?: string | null
          tag?: string | null
          test_mode?: boolean
          transactions?: Json[] | null
          unsubscribe_url?: string | null
          updated_at?: string
          user_redeemed_id?: string | null
          validity_statement?: string | null
          verification_status?: Json | null
          voucher_created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "buyers"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: number
          location: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          location: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          location?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          created_at: string
          email: string
          first_name: string
          last_name: string
          phone_number: string
          uid: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          last_name: string
          phone_number: string
          uid: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          last_name?: string
          phone_number?: string
          uid?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  api: {
    Enums: {},
  },
} as const
