export type Item = {
  id: number
  name: string
  category: string
  quantity: number
  price: number
  stock_status: string
  created_at: string
  updated_at: string
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