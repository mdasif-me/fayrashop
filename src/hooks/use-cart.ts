import { useGraphQLQuery, useGraphQLMutation } from './use-graphql'
import { GET_CART } from '@/lib/graphql/queries'
import {
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from '@/lib/graphql/mutations'

// Type definitions
export interface CartItem {
  _id: string
  product: {
    _id: string
    name: string
    slug: string
    price: number
    image: string
    stock: number
  }
  quantity: number
}

export interface Cart {
  _id: string
  items: CartItem[]
  total: number
}

interface CartData {
  cart: Cart
}

interface AddToCartVariables {
  productId: string
  quantity: number
}

interface UpdateCartItemVariables {
  itemId: string
  quantity: number
}

interface RemoveFromCartVariables {
  itemId: string
}

/**
 * Hook to fetch and manage cart data
 */
export function useCart() {
  const { data, loading, error, refetch, isInitialLoading, hasError, errorMessage } =
    useGraphQLQuery<CartData>(GET_CART, {
      fetchPolicy: 'cache-and-network',
      onError: (error) => {
        console.error('Failed to fetch cart:', error)
      },
    })

  const cart = data?.cart || null
  const itemCount = cart?.items?.reduce((sum, item) => sum + (item?.quantity || 0), 0) || 0

  return {
    cart,
    itemCount,
    loading,
    isInitialLoading,
    hasError,
    errorMessage,
    refetch,
  }
}

/**
 * Hook to add items to cart
 */
export function useAddToCart() {
  const { mutate, loading, error, hasError, errorMessage } = useGraphQLMutation<
    { addToCart: Cart },
    AddToCartVariables
  >(ADD_TO_CART, {
    refetchQueries: ['GetCart'],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log('Item added to cart:', data)
    },
    onError: (error) => {
      console.error('Failed to add item to cart:', error)
    },
  })

  const addToCart = async (productId: string, quantity: number = 1) => {
    return await mutate({ productId, quantity })
  }

  return {
    addToCart,
    loading,
    hasError,
    errorMessage,
  }
}

/**
 * Hook to update cart item quantity
 */
export function useUpdateCartItem() {
  const { mutate, loading, error, hasError, errorMessage } = useGraphQLMutation<
    { updateCartItem: Cart },
    UpdateCartItemVariables
  >(UPDATE_CART_ITEM, {
    refetchQueries: ['GetCart'],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log('Cart item updated:', data)
    },
    onError: (error) => {
      console.error('Failed to update cart item:', error)
    },
  })

  const updateCartItem = async (itemId: string, quantity: number) => {
    return await mutate({ itemId, quantity })
  }

  return {
    updateCartItem,
    loading,
    hasError,
    errorMessage,
  }
}

/**
 * Hook to remove item from cart
 */
export function useRemoveFromCart() {
  const { mutate, loading, error, hasError, errorMessage } = useGraphQLMutation<
    { removeFromCart: Cart },
    RemoveFromCartVariables
  >(REMOVE_FROM_CART, {
    refetchQueries: ['GetCart'],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log('Item removed from cart:', data)
    },
    onError: (error) => {
      console.error('Failed to remove item from cart:', error)
    },
  })

  const removeFromCart = async (itemId: string) => {
    return await mutate({ itemId })
  }

  return {
    removeFromCart,
    loading,
    hasError,
    errorMessage,
  }
}

/**
 * Hook to clear entire cart
 */
export function useClearCart() {
  const { mutate, loading, error, hasError, errorMessage } = useGraphQLMutation<{
    clearCart: Cart
  }>(CLEAR_CART, {
    refetchQueries: ['GetCart'],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log('Cart cleared:', data)
    },
    onError: (error) => {
      console.error('Failed to clear cart:', error)
    },
  })

  const clearCart = async () => {
    return await mutate()
  }

  return {
    clearCart,
    loading,
    hasError,
    errorMessage,
  }
}
