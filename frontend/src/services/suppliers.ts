import type { Supplier } from "../types/supplier"
import { apiFetch } from "./api"

export type SupplierCreate = {
  name: string
  contact_name?: string
  email?: string
  phone?: string
  website?: string
  category: string
  status: string
  notes?: string
}

export type SupplierUpdate = {
  name?: string
  contact_name?: string
  email?: string
  phone?: string
  website?: string
  category?: string
  status?: string
  notes?: string
}

export async function fetchSuppliers(): Promise<Supplier[]> {
  const response = await apiFetch("/suppliers")

  if (!response.ok) {
    throw new Error("Unable to load suppliers")
  }

  return response.json()
}

export async function createSupplier(
  supplier: SupplierCreate
): Promise<Supplier> {
  const response = await apiFetch("/suppliers", {
    method: "POST",
    body: JSON.stringify(supplier),
  })

  if (!response.ok) {
    throw new Error("Unable to create supplier")
  }

  return response.json()
}

export async function updateSupplier(
  supplierId: number,
  supplier: SupplierUpdate
): Promise<Supplier> {
  const response = await apiFetch(`/suppliers/${supplierId}`, {
    method: "PUT",
    body: JSON.stringify(supplier),
  })

  if (!response.ok) {
    throw new Error("Unable to update supplier")
  }

  return response.json()
}

export async function deleteSupplier(
  supplierId: number
): Promise<void> {
  const response = await apiFetch(`/suppliers/${supplierId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Unable to delete supplier")
  }
}