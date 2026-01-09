import { create } from 'zustand'

export interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  orders: number
  seller: string
  image: string
  isNew: boolean
  category: string
  brand: string
  colors: string[]
  deliveryDays: number
}

interface ProductStore {
  // State
  products: Product[]
  filteredProducts: Product[]
  selectedProductId: number | null
  selectedCategory: string
  searchQuery: string
  priceRange: [number, number]
  selectedBrands: string[]
  selectedColors: string[]
  deliveryDate: string
  viewMode: string

  // Actions
  setSelectedProductId: (productId: number | null) => void
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setPriceRange: (range: [number, number]) => void
  toggleBrand: (brand: string) => void
  toggleColor: (color: string) => void
  setDeliveryDate: (date: string) => void
  setViewMode: (mode: string) => void
  applyFilters: () => void
}

export const sampleProducts: Product[] = [
  {
    id: 1,
    title: 'iPhone 14 Pro Max 256GB Space Black',
    price: 999.0,
    originalPrice: 1299.0,
    discount: 23,
    rating: 4.8,
    orders: 234,
    seller: 'Apple Store Official',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: true,
    category: 'phones',
    brand: 'apple',
    colors: ['black', 'white'],
    deliveryDays: 1,
  },
  {
    id: 2,
    title: 'Samsung Galaxy S23 Ultra 512GB',
    price: 899.0,
    originalPrice: 1199.0,
    discount: 25,
    rating: 4.7,
    orders: 189,
    seller: 'Samsung Official',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: true,
    category: 'phones',
    brand: 'samsung',
    colors: ['black', 'purple'],
    deliveryDays: 2,
  },
  {
    id: 3,
    title: 'Huawei P50 Pro 128GB Golden',
    price: 699.0,
    originalPrice: 899.0,
    discount: 22,
    rating: 4.5,
    orders: 154,
    seller: 'Huawei Technology Ltd',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: false,
    category: 'phones',
    brand: 'huawei',
    colors: ['orange', 'black'],
    deliveryDays: 3,
  },
  {
    id: 4,
    title: 'Sony WH-1000XM5 Wireless Headphones',
    price: 299.0,
    originalPrice: 399.0,
    discount: 25,
    rating: 4.9,
    orders: 456,
    seller: 'Sony Electronics',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: true,
    category: 'headsets',
    brand: 'sony',
    colors: ['black', 'white'],
    deliveryDays: 1,
  },
  {
    id: 5,
    title: 'Bose QuietComfort 45 Headphones',
    price: 249.0,
    rating: 4.6,
    orders: 321,
    seller: 'Bose Official Store',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: false,
    category: 'headsets',
    brand: 'bose',
    colors: ['black', 'white'],
    deliveryDays: 2,
  },
  {
    id: 6,
    title: 'MacBook Pro 16-inch M2 Pro',
    price: 2199.0,
    originalPrice: 2499.0,
    discount: 12,
    rating: 4.8,
    orders: 89,
    seller: 'Apple Store Official',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: true,
    category: 'laptops',
    brand: 'apple',
    colors: ['gray', 'white'],
    deliveryDays: 3,
  },
  {
    id: 7,
    title: 'Dell XPS 13 Plus Intel i7',
    price: 1299.0,
    originalPrice: 1599.0,
    discount: 19,
    rating: 4.4,
    orders: 167,
    seller: 'Dell Technologies',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: false,
    category: 'laptops',
    brand: 'dell',
    colors: ['gray', 'black'],
    deliveryDays: 5,
  },
  {
    id: 8,
    title: 'Microsoft Surface Laptop 5',
    price: 999.0,
    rating: 4.3,
    orders: 134,
    seller: 'Microsoft Store',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: false,
    category: 'laptops',
    brand: 'microsoft',
    colors: ['blue', 'gray'],
    deliveryDays: 4,
  },
  {
    id: 9,
    title: 'Samsung 65-inch QLED 4K Smart TV',
    price: 1499.0,
    originalPrice: 1899.0,
    discount: 21,
    rating: 4.6,
    orders: 78,
    seller: 'Samsung Electronics',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: true,
    category: 'tv',
    brand: 'samsung',
    colors: ['black'],
    deliveryDays: 7,
  },
  {
    id: 10,
    title: 'LG OLED 55-inch C3 Series',
    price: 1299.0,
    originalPrice: 1699.0,
    discount: 24,
    rating: 4.7,
    orders: 92,
    seller: 'LG Electronics',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: true,
    category: 'tv',
    brand: 'lg',
    colors: ['black'],
    deliveryDays: 6,
  },
  {
    id: 11,
    title: 'JBL Charge 5 Portable Speaker',
    price: 149.0,
    originalPrice: 199.0,
    discount: 25,
    rating: 4.5,
    orders: 267,
    seller: 'JBL Official',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: false,
    category: 'sound',
    brand: 'jbl',
    colors: ['blue', 'red', 'black'],
    deliveryDays: 2,
  },
  {
    id: 12,
    title: 'Apple Watch Series 9 GPS 45mm',
    price: 399.0,
    originalPrice: 449.0,
    discount: 11,
    rating: 4.8,
    orders: 345,
    seller: 'Apple Store Official',
    image: 'https://placehold.co/600x400?text=Image',
    isNew: true,
    category: 'watches',
    brand: 'apple',
    colors: ['black', 'white', 'red'],
    deliveryDays: 1,
  },
]

export const useProductStore = create<ProductStore>((set, get) => ({
  // Initial state
  products: sampleProducts,
  filteredProducts: sampleProducts,
  selectedProductId: null,
  selectedCategory: 'all',
  searchQuery: '',
  priceRange: [0, 3000],
  selectedBrands: [],
  selectedColors: [],
  deliveryDate: 'any',
  viewMode: 'grid',

  // Actions
  setSelectedProductId: (productId) => {
    set({ selectedProductId: productId })
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category })
    get().applyFilters()
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().applyFilters()
  },

  setPriceRange: (range) => {
    set({ priceRange: range })
    get().applyFilters()
  },

  toggleBrand: (brand) => {
    const { selectedBrands } = get()
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand]
    set({ selectedBrands: newBrands })
    get().applyFilters()
  },

  toggleColor: (color) => {
    const { selectedColors } = get()
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color]
    set({ selectedColors: newColors })
    get().applyFilters()
  },

  setDeliveryDate: (date) => {
    set({ deliveryDate: date })
    get().applyFilters()
  },

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  applyFilters: () => {
    const {
      products,
      selectedCategory,
      searchQuery,
      priceRange,
      selectedBrands,
      selectedColors,
      deliveryDate,
    } = get()

    let filtered = products

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.seller.toLowerCase().includes(query)
      )
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color))
      )
    }

    // Delivery date filter
    if (deliveryDate !== 'any') {
      const maxDays =
        deliveryDate === 'today'
          ? 0
          : deliveryDate === 'tomorrow'
            ? 1
            : deliveryDate === 'week'
              ? 7
              : 999
      filtered = filtered.filter((product) => product.deliveryDays <= maxDays)
    }

    set({ filteredProducts: filtered })
  },
}))
