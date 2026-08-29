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
  stock_status: string
}

export type NewItem = {
  name: string
  category: string
  quantity: number
  price: number
}

export type InventoryStats = {
  total_products: number
  total_quantity: number
  total_inventory_value: number
  average_item_price: number
  in_stock_count: number
  low_stock_count: number
  out_of_stock_count: number
}

export type CategorySummaryItem = {
  category: string
  quantity: number
  value: number
}