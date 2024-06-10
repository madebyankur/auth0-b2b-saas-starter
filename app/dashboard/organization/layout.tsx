import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

import { appClient, managementClient } from "@/lib/auth0"
import { getRole } from "@/lib/roles"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AppBreadcrumb } from "@/components/app-breadcrumb"
import { Auth0Logo } from "@/components/auth0-logo"
import { OrganizationSwitcher } from "@/components/organization-switcher"
import { SidebarNav } from "@/components/sidebar-nav"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const session = await appClient.getSession()

  const { data: orgs } = await managementClient.users.getUserOrganizations({
    id: session?.user.sub,
  })

  // if the user is not authenticated, redirect to login
  if (!session?.user) {
    redirect("/api/auth/login")
  }

  const adminSidebarNavItems = [
    {
      title: "General Settings",
      href: "/dashboard/organization/general",
    },
    {
      title: "Members",
      href: "/dashboard/organization/members",
    },
    {
      title: "SSO",
      href: "/dashboard/organization/sso",
    },
    {
      title: "Security Policies",
      href: "/dashboard/organization/security-policies",
    },
  ]

  const profileSidebarNavItems = [
    {
      title: "Profile",
      href: "/dashboard/account/profile",
    },
    {
      title: "Logout",
      href: "/api/auth/logout",
    },
  ]

  const userRole = getRole(session.user)
  const isAdmin = userRole === "admin"

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Unauthorized</CardTitle>
            <CardDescription className="space-y-1.5">
              <p>
                You’re currently logged in with the role of{" "}
                <span className="font-semibold">{getRole(session.user)}</span>.
              </p>
              <p>
                Log in as an Organization member with the{" "}
                <span className="font-semibold">admin</span> role to manage your
                Organization&apos;s settings.
              </p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/dashboard" className="w-full">
              <Button className="w-full">
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> Go Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex" id="wrapper">
      <aside className="flex flex-col p-6 lg:w-1/5">
        <nav className="flex items-center justify-between">
          <AppBreadcrumb href="/dashboard" title="Back to SaaStart" />
        </nav>
        <Separator orientation="horizontal" className="my-4" />
        <OrganizationSwitcher
          className="mb-2 flex"
          organizations={orgs.map((o) => ({
            id: o.id,
            slug: o.name,
            displayName: o.display_name!,
            logoUrl: o.branding?.logo_url,
          }))}
          currentOrgId={session.user.org_id}
        />
        <SidebarNav items={adminSidebarNavItems} className="grow" />
        <SidebarNav items={profileSidebarNavItems} />
      </aside>
      <div
        className="bg-field m-1 rounded-2xl border border-border px-8 py-16 shadow-sm lg:w-4/5"
        id="workspace"
      >
        <div className="mx-auto max-w-6xl flex-1 py-12">{children}</div>
      </div>
    </div>
  )
}
