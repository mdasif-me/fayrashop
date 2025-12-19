import { gql } from '@apollo/client'

/**
 * Mutation to add item to cart
 */
export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      _id
      items {
        _id
        product {
          _id
          name
          price
          image
        }
        quantity
      }
      total
    }
  }
`

/**
 * Mutation to update cart item quantity
 */
export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($itemId: ID!, $quantity: Int!) {
    updateCartItem(itemId: $itemId, quantity: $quantity) {
      _id
      items {
        _id
        product {
          _id
          name
          price
          image
        }
        quantity
      }
      total
    }
  }
`

/**
 * Mutation to remove item from cart
 */
export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($itemId: ID!) {
    removeFromCart(itemId: $itemId) {
      _id
      items {
        _id
        product {
          _id
          name
          price
          image
        }
        quantity
      }
      total
    }
  }
`

/**
 * Mutation to clear cart
 */
export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart {
      _id
      items {
        _id
      }
      total
    }
  }
`

/**
 * Mutation to create an order
 */
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      _id
      orderNumber
      status
      total
      shippingAddress {
        street
        city
        state
        zipCode
        country
      }
      items {
        _id
        product {
          _id
          name
          price
        }
        quantity
        price
      }
      createdAt
    }
  }
`

/**
 * Mutation to update order status
 */
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      _id
      orderNumber
      status
      updatedAt
    }
  }
`

/**
 * Mutation to register a new user
 */
export const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        _id
        email
        name
      }
    }
  }
`

/**
 * Mutation to login user
 */
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        name
      }
    }
  }
`

/**
 * Mutation to update user profile
 */
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      _id
      email
      name
      phone
      address {
        street
        city
        state
        zipCode
        country
      }
    }
  }
`
