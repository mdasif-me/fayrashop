'use client'
import {
  IconBrandIntentui,
  IconCart,
  IconChevronLgDown,
  IconSearch,
  IconShoppingBag,
} from '@intentui/icons'
import NextLink from 'next/link'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/ui/link'
import { Menu, MenuContent, MenuItem } from '@/components/ui/menu'
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  type NavbarProps,
  NavbarProvider,
  NavbarSection,
  NavbarSeparator,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from '@/components/ui/navbar'
import { Separator } from '@/components/ui/separator'
import { UserMenu } from './user-menu'
import { Car, ShoppingBag } from 'lucide-react'

const categories = [
  {
    id: 1,
    label: 'Electronics',
    url: '/shop',
  },
  {
    id: 2,
    label: 'Fashion',
    url: '/shop',
  },
  {
    id: 3,
    label: 'Home & Kitchen',
    url: '/shop',
  },
  {
    id: 4,
    label: 'Sports',
    url: '/shop',
  },
  {
    id: 5,
    label: 'Books',
    url: '/shop',
  },
  {
    id: 6,
    label: 'Beauty & Personal Care',
    url: '/shop',
  },
  {
    id: 7,
    label: 'Grocery',
    url: '/shop',
  },
  {
    id: 8,
    label: 'Toys & Games',
    url: '/shop',
  },
  {
    id: 9,
    label: 'Automotive',
    url: '/shop',
  },
  {
    id: 10,
    label: 'Health & Wellness',
    url: '/shop',
  },
]

export default function AppNavbar(props: NavbarProps) {
  // const { isAuthenticated } = useAuth()

  return (
    <NavbarProvider>
      <Navbar {...props} intent="default">
        <NavbarStart>
          <Link
            className="flex items-center gap-x-2 font-medium"
            aria-label="Goto documentation of Navbar"
            href="/"
          >
            <IconCart className="size-6 sm:size-5" />
            <span>FayraShop</span>
          </Link>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          <NavbarItem href="/" isCurrent>
            Home
          </NavbarItem>
          <NavbarItem href="/shop">Shop</NavbarItem>
          <NavbarItem href="/offers">Offers</NavbarItem>
          {/* {isAuthenticated && <NavbarItem href="/orders">Orders</NavbarItem>} */}
          <Menu>
            <NavbarItem>
              Categories
              <IconChevronLgDown className="col-start-3" />
            </NavbarItem>
            <MenuContent className="min-w-(--trigger-width) sm:min-w-56" items={categories}>
              {(item) => (
                <MenuItem id={item.id} textValue={item.label} href={item.url}>
                  {item.label}
                </MenuItem>
              )}
            </MenuContent>
          </Menu>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="max-md:hidden">
          <Button variant="ghost" size="icon" aria-label="Search for products">
            <IconSearch />
          </Button>
          <NextLink href="/cart">
            <Button variant="ghost" size="icon" aria-label="Your Bag">
              <IconShoppingBag />
            </Button>
          </NextLink>
          <Separator orientation="vertical" className="mr-3 ml-1 h-5" />
          <UserMenu />
        </NavbarSection>
      </Navbar>
      <NavbarMobile>
        <NavbarTrigger />
        <NavbarSpacer />
        <Button variant="ghost" size="icon" aria-label="Search for products">
          <IconSearch />
        </Button>
        <NextLink href="/cart">
          <Button variant="ghost" size="icon" aria-label="Your Bag">
            <IconShoppingBag />
          </Button>
        </NextLink>
        <NavbarSeparator className="mr-2.5" />
        <UserMenu />
      </NavbarMobile>
    </NavbarProvider>
  )
}
