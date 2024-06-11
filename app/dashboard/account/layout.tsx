import { SidebarNav } from "@/components/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/account/profile",
  },
]

interface AccountLayoutProps {
  children: React.ReactNode
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div
          className="m-1 rounded-3xl border border-border bg-field p-8 shadow-sm lg:w-4/5"
          id="profile"
        >
          <div className="mx-auto max-w-6xl flex-1">{children}</div>
        </div>
      </div>
    </div>
  )
}
