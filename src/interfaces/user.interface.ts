export interface IAddress {
  id: string
  first_name: string
  last_name: string
  company_name?: string | null
  address: string
  country: string
  state: string
  city: string
  zip_code: string
  email: string
  phone_number: string
  type?: string
  created_at?: string
  updated_at?: string
}

export interface IAsset {
  id: string
  public_id: string
  secure_url: string
  format: string
  width: number
  height: number
  size: number
  asset_type: string
  purpose: string
  owner_type?: string | null
  owner_id?: string | null
  created_at: string
  updated_at: string
  deleted_at?: string | null
}
