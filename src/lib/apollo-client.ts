import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// Configure the HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
  // You can add custom headers here if needed
  // headers: {
  //   authorization: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
  // },
})

// Create the Apollo Client instance
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  // Enable SSR mode when running on the server
  ssrMode: typeof window === 'undefined',
  // Configure default options for queries
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})

export default client
