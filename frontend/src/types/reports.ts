export type InventoryStats = {
  total_products: number
  total_quantity: number
  total_inventory_value: number
  average_item_price: number
  in_stock_count: number
  low_stock_count: number
  out_of_stock_count: number
}

export type HighestValueItem = {
  name: string
  category: string
  inventory_value: string
}

export type LowestStockItem = {
  name: string
  category: string
  quantity: number
  stock_status: string
}

export type CategorySummary = Record<
  string,
  number
>

export type CategoryValue = Record<
  string,
  string
>

export type Supplier = {
  id: number
  name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  category: string
  status: string
  notes: string | null
  created_at: string
  updated_at: string
}