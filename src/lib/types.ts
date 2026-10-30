export interface ComboOption {
  id: string;
  title: string;
  quantity: number;
  price: number;
  originalPrice: number;
  discountBadge?: string;
  popular?: boolean;
  saveText?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  verified: boolean;
  date?: string;
  avatarUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LandingData {
  id: string;
  created_at?: string;
  slug: string; // e.g. "mini-proyector-4k"
  custom_domain?: string; // e.g. "misuperoferta.com"
  
  // Marketing & Hero
  product_name: string;
  headline: string;
  subheadline: string;
  badge_text: string;
  urgency_bar_text: string;
  countdown_minutes: number;
  
  // Pricing
  price_regular: number;
  price_promo: number;
  currency_symbol: string;
  
  // Contacts & Conversion
  whatsapp_number: string; // e.g. "573001234567"
  whatsapp_message_prefix?: string;
  meta_pixel_id?: string;
  meta_domain_verification?: string;
  
  // Theme & Styling
  primary_color: string;
  accent_color: string;
  
  // Media & Lists
  images: string[];
  features: FeatureItem[];
  combos: ComboOption[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  
  // Guarantee & Security
  guarantee_days: number;
  shipping_badge_text: string;
  payment_method_text: string;
  
  // Legal
  company_name: string;
  support_email: string;
  business_address: string;
}

export interface OrderData {
  id?: string;
  created_at?: string;
  landing_id?: string;
  landing_slug: string;
  product_name: string;
  combo_selected: string;
  total_price: number;
  customer_name: string;
  customer_phone: string;
  customer_department?: string;
  customer_city: string;
  customer_address: string;
  customer_notes?: string;
  status?: string;
}
