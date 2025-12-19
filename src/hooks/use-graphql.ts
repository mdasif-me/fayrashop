import { useQuery, useMutation, useLazyQuery } from '@apollo/client/react'
import type { DocumentNode } from 'graphql'

/**
 * Enhanced useQuery hook with better error handling and loading states
 */
export function useGraphQLQuery<
  TData = any,
  TVariables extends Record<string, any> = Record<string, any>,
>(
  query: DocumentNode,
  options?: {
    variables?: TVariables
    skip?: boolean
    fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'cache-and-network'
    onCompleted?: (data: TData) => void
    onError?: (error: any) => void
  }
) {
  const { data, loading, error, refetch, fetchMore, networkStatus } = useQuery<TData, TVariables>(
    query,
    {
      variables: options?.variables as any,
      skip: options?.skip,
      fetchPolicy: options?.fetchPolicy || 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onCompleted: options?.onCompleted,
      onError: options?.onError,
    } as any
  )

  return {
    data,
    loading,
    error,
    refetch,
    fetchMore,
    networkStatus,
    // Helper states
    isInitialLoading: loading && !data,
    isRefetching: loading && !!data,
    hasError: !!error,
    errorMessage: error?.message || null,
  }
}

/**
 * Enhanced useMutation hook with better error handling and loading states
 */
export function useGraphQLMutation<
  TData = any,
  TVariables extends Record<string, any> = Record<string, any>,
>(
  mutation: DocumentNode,
  options?: {
    onCompleted?: (data: TData) => void
    onError?: (error: any) => void
    refetchQueries?: string[] | DocumentNode[]
    awaitRefetchQueries?: boolean
  }
) {
  const [mutate, { data, loading, error, reset }] = useMutation<TData, TVariables>(mutation, {
    onCompleted: options?.onCompleted,
    onError: options?.onError,
    refetchQueries: options?.refetchQueries as any,
    awaitRefetchQueries: options?.awaitRefetchQueries,
  } as any)

  const executeMutation = async (variables?: TVariables) => {
    try {
      const result = await mutate({ variables } as any)
      return {
        success: true,
        data: result.data,
        error: null,
      }
    } catch (err) {
      console.error('Mutation error:', err)
      return {
        success: false,
        data: null,
        error: err,
      }
    }
  }

  return {
    mutate: executeMutation,
    data,
    loading,
    error,
    reset,
    // Helper states
    isLoading: loading,
    hasError: !!error,
    errorMessage: error?.message || null,
  }
}

/**
 * Hook for lazy query execution (query on demand)
 */
export function useLazyGraphQLQuery<
  TData = any,
  TVariables extends Record<string, any> = Record<string, any>,
>(
  query: DocumentNode,
  options?: {
    fetchPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'no-cache' | 'cache-and-network'
    onCompleted?: (data: TData) => void
    onError?: (error: any) => void
  }
) {
  const [execute, { data, loading, error }] = useLazyQuery<TData, TVariables>(query, {
    fetchPolicy: options?.fetchPolicy || 'network-only',
    onCompleted: options?.onCompleted,
    onError: options?.onError,
  } as any)

  const executeQuery = async (variables?: TVariables) => {
    try {
      const result = await execute({ variables } as any)
      return {
        success: true,
        data: result.data,
        error: null,
      }
    } catch (err) {
      console.error('Query error:', err)
      return {
        success: false,
        data: null,
        error: err,
      }
    }
  }

  return {
    executeQuery,
    data,
    loading,
    error,
    // Helper states
    isLoading: loading,
    hasError: !!error,
    errorMessage: error?.message || null,
  }
}
