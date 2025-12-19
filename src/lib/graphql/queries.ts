import { gql } from '@apollo/client'

/**
 * Query to fetch the category tree with nested children
 */
export const GET_CATEGORY_TREE = gql`
  query GetCategoryTree {
    categoryTree {
      _id
      name
      slug
      children {
        _id
        name
        slug
        children {
          _id
          name
          slug
          children {
            _id
            name
            slug
            children {
              _id
              name
              slug
              children {
                _id
                name
                slug
                children {
                  _id
                  name
                  slug
                  children {
                    _id
                    name
                    slug
                    children {
                      _id
                      name
                      slug
                      children {
                        _id
                        name
                        slug
                        children {
                          _id
                          name
                          slug
                          children {
                            _id
                            name
                            slug
                            children {
                              _id
                              name
                              slug
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      productCount
    }
  }
`

/**
 * Query to fetch products with pagination
 */
export const GET_PRODUCTS = gql`
  query GetProducts($page: Int, $limit: Int, $categoryId: ID) {
    products(page: $page, limit: $limit, categoryId: $categoryId) {
      items {
        _id
        name
        slug
        description
        price
        image
        category {
          _id
          name
          slug
        }
      }
      pagination {
        page
        limit
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`

/**
 * Query to fetch a single product by ID or slug
 */
export const GET_PRODUCT = gql`
  query GetProduct($id: ID, $slug: String) {
    product(id: $id, slug: $slug) {
      _id
      name
      slug
      description
      price
      image
      stock
      category {
        _id
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`

/**
 * Query to fetch user orders
 */
export const GET_USER_ORDERS = gql`
  query GetUserOrders($page: Int, $limit: Int) {
    userOrders(page: $page, limit: $limit) {
      items {
        _id
        orderNumber
        status
        total
        createdAt
        items {
          _id
          product {
            _id
            name
            image
          }
          quantity
          price
        }
      }
      pagination {
        page
        limit
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`

/**
 * Query to fetch user cart
 */
export const GET_CART = gql`
  query GetCart {
    cart {
      _id
      items {
        _id
        product {
          _id
          name
          slug
          price
          image
          stock
        }
        quantity
      }
      total
    }
  }
`
