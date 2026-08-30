export type StockStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock"

export type Item = {
  id: number
  name: string
  sku: string
  category: string
  quantity: number
  min_threshold: number
  price: number
  created_at: string
  updated_at: string
  stock_status: StockStatus
}

export type NewItem = {
  name: string
  sku: string
  category: string
  quantity: number
  min_threshold: number
  price: number
}