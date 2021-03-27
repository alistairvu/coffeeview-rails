interface CafeInterface {
  id: number
  name: string
  address: string
  district: string
  description: string
  price: string
  hours: string
  slug: string
  created_at: string
  updated_at: string
  images: string[]
  tags: string[]
  is_shown: boolean
  avg_rating: number
}

interface ReviewInterface {
  id: number
  title: string
  rating: number
  content: string
  user_name: string
  user_id: number
  cafe_id: number
}
