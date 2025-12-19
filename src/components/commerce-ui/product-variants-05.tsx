'use client'

import ImageCarouselBasic, { CarouselImage } from '@/components/commerce-ui/image-carousel-basic'
import PriceFormat from '@/components/commerce-ui/price-format-basic'
import QuantityInputBasic from '@/components/commerce-ui/quantity-input-basic'
import StarRating_Fractions from '@/components/commerce-ui/star-rating-fractions'
import VariantSelectorMultiple, {
  VariantItem as BaseVariantItem,
} from '@/components/commerce-ui/variant-selector-multiple'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Users } from 'lucide-react'
import { useState } from 'react'

interface AccessoryVariant extends BaseVariantItem {
  price: number
  salePrice?: number
  isInStock?: boolean
  availableQuantity?: number | null
}

interface ServiceVariant extends BaseVariantItem {
  price: number
  salePrice?: number
}

interface Benefit {
  icon?: React.ReactNode
  title: string
  description: string
}

interface FeaturedReview {
  rating: number
  reviewDate: string
  reviewText: string
  avatarUrl: string
  reviewerName: string
  reviewerTitle: string
}

interface VariantSelectionPayload {
  productPrice: number
  accessoryIds: string[]
  accessoryLabels: string[]
  accessoriesPrice: number
  serviceIds: string[]
  serviceLabels: string[]
  servicesPrice: number
  quantity: number
  totalPrice: number
}

interface ProductVariant05Props {
  title?: string
  description?: string
  price?: number
  badge?: string | null
  rating?: number
  reviewCount?: number
  warranty?: string
  images?: CarouselImage[]
  defaultImages?: CarouselImage[]
  benefits?: Benefit[]
  accessoryVariants?: AccessoryVariant[]
  serviceVariants?: ServiceVariant[]
  initialAccessories?: string[]
  initialServices?: string[]
  selectedAccessories?: string[]
  onAccessoriesChange?: (accessories: string[]) => void
  selectedServices?: string[]
  onServicesChange?: (services: string[]) => void
  quantity?: number
  onQuantityChange?: (quantity: number) => void
  onAddToCart?: (payload: VariantSelectionPayload) => void
  onBuyNow?: (payload: VariantSelectionPayload) => void
  isLoading?: boolean
  errorMessage?: string | null
  currencyPrefix?: string
  featuredReview?: FeaturedReview
}

// Default accessory options
const DEFAULT_ACCESSORY_VARIANTS: AccessoryVariant[] = [
  {
    id: 'acc-1',
    isInStock: true,
    label: 'Accessory 1',
    price: 10.99,
    value: 'acc-1',
  },
  {
    id: 'acc-2',
    isInStock: true,
    label: 'Accessory 2',
    price: 15.99,
    value: 'acc-3',
  },
  {
    id: 'acc-3',
    isInStock: true,
    label: 'Accessory 3',
    price: 65.99,
    value: 'acc-3',
  },
]

// Default service options
const DEFAULT_SERVICE_VARIANTS: ServiceVariant[] = [
  {
    id: 'serv-extended',
    label: 'Extended Warranty (+2 Years)',
    price: 99.99,
    value: 'serv-extended',
  },
  {
    id: 'serv-installation',
    label: 'Professional Installation',
    price: 79.99,
    value: 'serv-installation',
  },
  {
    id: 'serv-maintenance',
    label: 'Annual Maintenance Plan',
    price: 149.99,
    value: 'serv-maintenance',
  },
]

// Default product images for carousel
const DEFAULT_PRODUCT_IMAGES: CarouselImage[] = [
  {
    title: 'Coffee Machine Front View',
    url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-machine-01.jpg',
  },
  {
    title: 'Coffee Machine Side View',
    url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-machine-02.jpg',
  },
  {
    title: 'Coffee Machine Cups',
    url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-cups-01.jpg',
  },
  {
    title: 'Coffee Filters',
    url: 'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/coffee-filter-01.jpg',
  },
]

function ProductVariant_05({
  accessoryVariants = DEFAULT_ACCESSORY_VARIANTS,
  badge = 'New Arrival',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  title = 'Product Title',
  benefits = [
    {
      description: 'A very good benefit description',
      title: 'Benefit A',
    },
    {
      description: 'A very good benefit description',
      title: 'Benefit B',
    },
    {
      description: 'A very good benefit description',
      title: 'Benefit C',
    },
  ],
  currencyPrefix = '$',
  defaultImages = [],
  errorMessage = null,
  rating = 4.8,
  featuredReview = {
    avatarUrl:
      'https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/user-04.jpg',
    rating: 5,
    reviewDate: 'Mar 15, 2024',
    reviewerName: 'John Doe',
    reviewerTitle: 'Reviewer',
    reviewText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  images = DEFAULT_PRODUCT_IMAGES,
  initialAccessories = ['acc-descaler'],
  initialServices = [],
  isLoading = false,
  onAccessoriesChange,
  onAddToCart = () => {},
  onBuyNow = () => {},
  onQuantityChange,
  onServicesChange,
  price = 399.99,
  quantity: controlledQuantity,
  reviewCount = 256,
  selectedAccessories: controlledAccessories,
  selectedServices: controlledServices,
  serviceVariants = DEFAULT_SERVICE_VARIANTS,
  warranty = '2 Year',
}: ProductVariant05Props) {
  // Internal state management for uncontrolled component
  const [internalSelectedAccessories, setInternalSelectedAccessories] =
    useState<string[]>(initialAccessories)
  const [internalSelectedServices, setInternalSelectedServices] =
    useState<string[]>(initialServices)
  const [internalQuantity, setInternalQuantity] = useState(1)

  // Determine if we're in controlled or uncontrolled mode
  const isAccessoriesControlled = controlledAccessories !== undefined
  const isServicesControlled = controlledServices !== undefined
  const isQuantityControlled = controlledQuantity !== undefined

  const selectedAccessoryIds = isAccessoriesControlled
    ? controlledAccessories
    : internalSelectedAccessories
  const selectedServiceIds = isServicesControlled ? controlledServices : internalSelectedServices
  const quantity = isQuantityControlled ? controlledQuantity : internalQuantity

  const handleAccessoriesChange = (newAccessories: string[]) => {
    if (isAccessoriesControlled) {
      onAccessoriesChange?.(newAccessories)
    } else {
      setInternalSelectedAccessories(newAccessories)
    }
  }

  const handleServicesChange = (newServices: string[]) => {
    if (isServicesControlled) {
      onServicesChange?.(newServices)
    } else {
      setInternalSelectedServices(newServices)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (isQuantityControlled) {
      onQuantityChange?.(newQuantity)
    } else {
      setInternalQuantity(newQuantity)
    }
  }

  // Calculate accessories price
  const accessoriesPrice = selectedAccessoryIds.reduce((total, acc) => {
    const accessory = accessoryVariants.find((a) => a.value === acc)
    return total + (accessory?.price || 0)
  }, 0)

  // Calculate services price
  const servicesPrice = selectedServiceIds.reduce((total, serv) => {
    const service = serviceVariants.find((s) => s.value === serv)
    return total + (service?.price || 0)
  }, 0)

  // Calculate total price
  const itemPrice = price + accessoriesPrice + servicesPrice
  const totalPrice = itemPrice * quantity

  // Add visual indicator for out of stock items
  const accessoryVariantsWithStockIndicator = accessoryVariants.map((variant) => {
    const isInStock = variant.isInStock !== undefined ? variant.isInStock : true
    return {
      ...variant,
      disabled: !isInStock,
      label: variant.label + (isInStock ? '' : ' (Out of Stock)'),
    }
  })

  const handleAddToCart = () => {
    onAddToCart({
      accessoriesPrice,
      accessoryIds: selectedAccessoryIds,
      accessoryLabels: selectedAccessoryIds.map((id) => {
        const accessory = accessoryVariants.find((a) => a.value === id)
        return accessory?.label || ''
      }),
      productPrice: price,
      quantity,
      serviceIds: selectedServiceIds,
      serviceLabels: selectedServiceIds.map((id) => {
        const service = serviceVariants.find((s) => s.value === id)
        return service?.label || ''
      }),
      servicesPrice,
      totalPrice,
    })
  }

  const handleBuyNow = () => {
    onBuyNow({
      accessoriesPrice,
      accessoryIds: selectedAccessoryIds,
      accessoryLabels: selectedAccessoryIds.map((id) => {
        const accessory = accessoryVariants.find((a) => a.value === id)
        return accessory?.label || ''
      }),
      productPrice: price,
      quantity,
      serviceIds: selectedServiceIds,
      serviceLabels: selectedServiceIds.map((id) => {
        const service = serviceVariants.find((s) => s.value === id)
        return service?.label || ''
      }),
      servicesPrice,
      totalPrice,
    })
  }

  if (errorMessage) {
    return (
      <div className="my-6 rounded-lg border">
        <p className="font-medium">Error loading product</p>
        <p className="text-sm">{errorMessage}</p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-x flex flex-col">
      {/* Main product card */}
      <div className="relative flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col lg:flex-row">
          {/* Image and review section - left column */}
          <div className="relative flex w-full flex-col border-r lg:h-auto lg:w-1/2">
            {badge && (
              <div className="absolute top-3 left-3 z-20 flex items-center justify-center">
                <div className="rounded-md px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-md">
                  {badge}
                </div>
              </div>
            )}

            {/* Image Carousel */}
            <div className="relative z-10 flex h-full items-center justify-center p-6">
              <div className="w-full transition-all duration-500">
                {isLoading ? (
                  <div className="flex h-[300px] items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                  </div>
                ) : (
                  <ImageCarouselBasic
                    images={images.length > 0 ? images : defaultImages}
                    showThumbs={true}
                    thumbPosition="bottom"
                    showCarouselControls={true}
                    className="mx-auto"
                  />
                )}
              </div>
            </div>

            <div className="relative z-10 px-6 pb-6">
              <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <h4 className="text-sm font-medium">{reviewCount}+ Happy Customers</h4>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <StarRating_Fractions
                      value={featuredReview.rating}
                      readOnly={true}
                      iconSize={14}
                      color="#facc15"
                      className="flex-shrink-0"
                    />
                    <span className="text-xs">{featuredReview.reviewDate}</span>
                  </div>
                  <p className="text-sm italic">&quot;{featuredReview.reviewText}&quot;</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={featuredReview.avatarUrl}
                      alt={featuredReview.reviewerName}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-medium">{featuredReview.reviewerName}</p>
                      <p className="text-xs text-gray-600">{featuredReview.reviewerTitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content section - right side */}
          <div className="relative z-10 flex flex-1 flex-col justify-between p-5 lg:w-1/2">
            <div>
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <PriceFormat
                    prefix={currencyPrefix}
                    value={price}
                    className="text-xl font-bold text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div className="mb-2 flex items-center">
                  <StarRating_Fractions
                    value={rating}
                    readOnly={true}
                    iconSize={16}
                    color="#facc15"
                    className="flex-shrink-0"
                  />
                  <span className="ml-2 text-sm">({reviewCount} reviews)</span>
                </div>

                <p className="text-sm">{description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Accessories</label>
                  <VariantSelectorMultiple
                    values={selectedAccessoryIds}
                    onValuesChange={handleAccessoriesChange}
                    variants={accessoryVariantsWithStockIndicator}
                    className="flex-wrap"
                    itemClassName="
                        hover:border-primary
                        data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white
                        focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 dark:focus:ring-offset-gray-900
                      "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Service & Protection</label>
                  <VariantSelectorMultiple
                    values={selectedServiceIds}
                    onValuesChange={handleServicesChange}
                    variants={serviceVariants}
                    className="flex-wrap"
                    itemClassName="
                        hover:border-primary
                        data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-white
                        focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 dark:focus:ring-offset-gray-900
                      "
                  />
                </div>
              </div>

              {/* Selections summary */}
              {(selectedAccessoryIds.length > 0 || selectedServiceIds.length > 0) && (
                <div className="border-primary/20 bg-primary/5 my-4 rounded-md border p-3">
                  {selectedAccessoryIds.length > 0 && (
                    <div className="mb-2">
                      <h4 className="text-sm font-medium">Selected accessories:</h4>
                      <ul className="space-y-1">
                        {selectedAccessoryIds.map((accId) => {
                          const accessory = accessoryVariants.find((a) => a.value === accId)
                          return (
                            <li key={accId} className="flex items-center justify-between text-sm">
                              <span>{accessory?.label}</span>
                              <PriceFormat
                                prefix={currencyPrefix}
                                value={accessory?.price || 0}
                                className="font-light"
                              />
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}

                  {selectedServiceIds.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium">Selected services:</h4>
                      <ul className="space-y-1">
                        {selectedServiceIds.map((servId) => {
                          const service = serviceVariants.find((s) => s.value === servId)
                          return (
                            <li
                              key={servId}
                              className="flex items-center justify-between text-sm dark:text-gray-400"
                            >
                              <span>{service?.label}</span>
                              <PriceFormat
                                prefix={currencyPrefix}
                                value={service?.price || 0}
                                className="font-light"
                              />
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity selection */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Quantity</label>
                    <QuantityInputBasic
                      quantity={quantity}
                      onChange={handleQuantityChange}
                      max={10}
                      className="w-[120px]"
                    />
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-medium">Total</span>
                    <PriceFormat
                      prefix={currencyPrefix}
                      value={totalPrice}
                      className="text-primary text-lg font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-2 flex space-x-2">
              <Button
                variant="outline"
                onClick={handleAddToCart}
                className="border-primary text-primary hover:bg-primary flex-1 hover:text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Add to cart'}
              </Button>
              <Button onClick={handleBuyNow} className="flex-1 text-white" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Buy now'}
              </Button>
            </div>

            <div className="mt-3">
              <p className="flex items-center text-xs font-medium">
                <ShieldCheck className="mr-1 h-4 w-4 text-green-600" />
                {warranty} Manufacturer Warranty Included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductVariant_05
export type {
  AccessoryVariant,
  Benefit,
  FeaturedReview,
  ProductVariant05Props,
  ServiceVariant,
  VariantSelectionPayload,
}
