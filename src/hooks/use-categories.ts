import { useGraphQLQuery } from './use-graphql'
import { GET_CATEGORY_TREE } from '@/lib/graphql/queries'
import type { CategoryTreeData, Category } from '@/types'
import { useMemo } from 'react'

/**
 * Custom hook to fetch and manage category tree data
 */
export function useCategories() {
  const { data, loading, error, refetch, isInitialLoading, isRefetching, hasError, errorMessage } =
    useGraphQLQuery<CategoryTreeData>(GET_CATEGORY_TREE, {
      fetchPolicy: 'cache-and-network',
      onError: (error) => {
        console.error('Failed to fetch categories:', error)
      },
    })

  // Memoize the categories to avoid unnecessary recalculations
  const categories = useMemo(() => {
    if (!data?.categoryTree) return []
    return data.categoryTree
  }, [data])

  return {
    // Raw nested data
    categories,

    // Loading states
    loading,
    isInitialLoading,
    isRefetching,

    // Error states
    error,
    hasError,
    errorMessage,

    // Actions
    refetch,
  }
}
