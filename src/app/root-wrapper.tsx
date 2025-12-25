import { ClientProviders } from './client-providers'

export const RootWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ClientProviders>{children}</ClientProviders>
}
