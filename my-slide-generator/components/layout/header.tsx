import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "AI Writing Assistant",
    href: "/features/ai-assistant",
    description: "Let AI help you write your book with smart suggestions and ideas.",
  },
  {
    title: "Book Templates",
    href: "/templates",
    description: "Choose from our collection of professional book templates.",
  },
  {
    title: "Writing Tools",
    href: "/features/tools",
    description: "Access powerful tools for plotting, character development, and more.",
  },
]

const resources = [
  {
    title: "Writing Guide",
    href: "/resources/guide",
    description: "Learn the fundamentals of writing a successful book.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Tips, tricks, and insights from professional authors.",
  },
  {
    title: "Community",
    href: "/community",
    description: "Connect with other authors and share your experiences.",
  },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-slate-900/5 backdrop-blur-lg">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/Logo Poli.png"
                  alt="Logo Poli"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>
            <div className="h-6 w-px bg-gray-200 hidden md:block" />
          </div>

          {/* Center and Right Side Combined */}
          <div className="flex items-center gap-2">
            {/* Navigation Menu */}
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList className="flex gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-slate-600 hover:text-slate-900 data-[active]:text-slate-900 data-[state=open]:text-slate-900">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {features.map((feature) => (
                        <ListItem
                          key={feature.title}
                          title={feature.title}
                          href={feature.href}
                        >
                          {feature.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-slate-600 hover:text-slate-900 data-[active]:text-slate-900 data-[state=open]:text-slate-900">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {resources.map((resource) => (
                        <ListItem
                          key={resource.title}
                          title={resource.title}
                          href={resource.href}
                        >
                          {resource.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="text-sm font-medium text-slate-600 hover:text-slate-900">
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Actions and App Name */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-gradient-to-r from-purple-300/50 to-indigo-300/50 px-4 py-2 text-sm font-medium text-slate-800 hover:from-purple-400/50 hover:to-indigo-400/50 transition-colors"
                >
                  Start Writing
                </Link>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hidden md:inline-block">
                ScribeAI
              </span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
