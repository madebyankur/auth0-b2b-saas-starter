import Link from "next/link"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { appClient, managementClient } from "@/lib/auth0"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Auth0Logo } from "@/components/auth0-logo"
import { ModeToggle } from "@/components/mode-toggle"
import { OrganizationSwitcher } from "@/components/organization-switcher"
import { UserNav } from "@/components/user-nav"

export default async function DashboardHome() {
  const session = await appClient.getSession()

  const { data: orgs } = await managementClient.users.getUserOrganizations({
    id: session?.user.sub,
  })

  return (
    <div>
      <header className="mx-auto px-2 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <OrganizationSwitcher
              className="flex"
              organizations={orgs.map((o) => ({
                id: o.id,
                slug: o.name,
                displayName: o.display_name!,
                logoUrl: o.branding?.logo_url,
              }))}
              currentOrgId={session?.user.org_id}
            />
            <div className="flex">
              <Button variant="link" asChild>
                <Link href="/">Home</Link>
              </Button>

              <Button variant="link" asChild>
                <Link
                  href="https://github.com/auth0-developer-hub/auth0-b2b-saas-starter"
                  target="_blank"
                >
                  Source
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-x-4">
            <Button
              variant="secondary"
              asChild
              className={cn("px-2 py-2", "hover:bg-black/5")}
            >
              <Link href="/dashboard/organization/general">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.608 12.2738C15.507 12.5024 15.4776 12.7555 15.5217 13.0018C15.5659 13.248 15.6836 13.4747 15.8582 13.6532L15.9034 13.6984C16.0447 13.8387 16.1565 14.0065 16.2321 14.1899C16.3086 14.3734 16.3478 14.5706 16.3478 14.7698C16.3478 14.969 16.3086 15.1662 16.2321 15.3496C16.1555 15.5331 16.0437 15.7009 15.9034 15.8412C15.7631 15.9825 15.5953 16.0933 15.4118 16.1699C15.2283 16.2464 15.0311 16.2856 14.832 16.2856C14.6328 16.2856 14.4356 16.2464 14.2521 16.1699C14.0686 16.0933 13.9009 15.9815 13.7606 15.8412L13.7154 15.7961C13.5369 15.6214 13.3102 15.5047 13.0639 15.4595C12.8177 15.4154 12.5645 15.4448 12.3359 15.5459C12.1122 15.642 11.9209 15.801 11.7865 16.005C11.6521 16.2091 11.5795 16.4466 11.5785 16.6899V16.8184C11.5785 17.2207 11.4186 17.6053 11.135 17.8898C10.8505 18.1743 10.4649 18.3333 10.0636 18.3333C9.66134 18.3333 9.27673 18.1734 8.9922 17.8898C8.70767 17.6053 8.54873 17.2197 8.54873 16.8184V16.7507C8.54284 16.4995 8.4614 16.2572 8.31619 16.0531C8.17 15.849 7.96593 15.694 7.73045 15.6067C7.50185 15.5056 7.24871 15.4762 7.00244 15.5204C6.75618 15.5645 6.52953 15.6822 6.35097 15.8569L6.30583 15.902C6.16553 16.0433 5.99775 16.1552 5.81428 16.2307C5.63081 16.3072 5.4336 16.3465 5.23443 16.3465C5.03525 16.3465 4.83804 16.3072 4.65457 16.2307C4.4711 16.1542 4.30332 16.0423 4.16302 15.902C4.02173 15.7617 3.90988 15.5939 3.83434 15.4105C3.75781 15.227 3.71856 15.0298 3.71856 14.8306C3.71856 14.6314 3.75781 14.4342 3.83434 14.2508C3.91086 14.0673 4.02272 13.8995 4.16302 13.7592L4.20815 13.7141C4.38279 13.5355 4.49955 13.3089 4.54468 13.0626C4.58883 12.8163 4.5594 12.5632 4.45834 12.3346C4.36219 12.1109 4.20325 11.9196 3.99917 11.7851C3.79509 11.6507 3.55765 11.5781 3.31433 11.5771H3.1858C2.78353 11.5771 2.39892 11.4172 2.11439 11.1337C1.82692 10.8491 1.66699 10.4635 1.66699 10.0613C1.66699 9.65901 1.82692 9.27441 2.11047 8.98987C2.395 8.70534 2.77961 8.5464 3.18188 8.5464H3.25056C3.50173 8.54051 3.74407 8.45908 3.94815 8.31387C4.15223 8.16768 4.30725 7.9636 4.39457 7.72812C4.49563 7.49952 4.52506 7.24638 4.48091 7.00012C4.43676 6.75385 4.31902 6.52721 4.14438 6.34864L4.09924 6.30351C3.95796 6.1632 3.84611 5.99543 3.77056 5.81195C3.69403 5.62848 3.65479 5.43127 3.65479 5.2321C3.65479 5.03293 3.69403 4.83572 3.77056 4.65224C3.84709 4.46877 3.95894 4.30099 4.09924 4.16069C4.23955 4.01941 4.40732 3.90756 4.5908 3.83201C4.77427 3.75548 4.97148 3.71623 5.17065 3.71623C5.36982 3.71623 5.56703 3.75548 5.75051 3.83201C5.93398 3.90854 6.10176 4.02039 6.24206 4.16069L6.28719 4.20582C6.46576 4.38047 6.6924 4.49722 6.93867 4.54235C7.18494 4.58651 7.43807 4.55707 7.66668 4.45601H7.72751C7.95121 4.35986 8.14253 4.20092 8.27695 3.99684C8.41137 3.79374 8.48397 3.55533 8.48495 3.312V3.18347C8.48495 2.7812 8.64488 2.3966 8.92843 2.11206C9.21394 1.82655 9.59953 1.66663 10.0008 1.66663C10.4031 1.66663 10.7877 1.82655 11.0722 2.1101C11.3568 2.39463 11.5157 2.77924 11.5157 3.18151V3.25019C11.5167 3.49351 11.5893 3.73193 11.7237 3.93503C11.8581 4.13812 12.0494 4.29805 12.2731 4.3942C12.5017 4.49526 12.7549 4.52469 13.0011 4.48054C13.2474 4.43639 13.4741 4.31865 13.6526 4.14401L13.6978 4.09888C13.8381 3.95759 14.0058 3.84574 14.1893 3.7702C14.3728 3.69367 14.57 3.65442 14.7692 3.65442C14.9683 3.65442 15.1655 3.69367 15.349 3.7702C15.5325 3.84672 15.7003 3.95858 15.8406 4.09888C15.9819 4.23918 16.0927 4.40696 16.1693 4.59043C16.2458 4.7739 16.285 4.97111 16.285 5.17029C16.285 5.36946 16.2458 5.56667 16.1693 5.75014C16.0927 5.93361 15.9809 6.10139 15.8406 6.24169L15.7954 6.28683C15.6208 6.46539 15.504 6.69204 15.4589 6.9383C15.4148 7.18457 15.4442 7.43771 15.5453 7.66631V7.72714C15.6414 7.95084 15.8003 8.14217 16.0044 8.27658C16.2085 8.411 16.4459 8.4836 16.6893 8.48459H16.8178C17.2201 8.48459 17.6047 8.64451 17.8892 8.92806C18.1737 9.21259 18.3327 9.5972 18.3327 9.99947C18.3327 10.4017 18.1728 10.7863 17.8892 11.0709C17.6047 11.3554 17.2191 11.5144 16.8178 11.5144H16.7501C16.5068 11.5153 16.2684 11.5879 16.0653 11.7224C15.8631 11.8587 15.7042 12.0501 15.608 12.2738Z"
                    fill="#191919"
                    style={{
                      fill: "#191919 color(display-p3 0.0980 0.0980 0.0980)",
                      fillOpacity: 1,
                    }}
                  />
                  <path
                    d="M10.0004 12.5947C11.4331 12.5947 12.5945 11.4332 12.5945 10.0005C12.5945 8.56781 11.4331 7.40637 10.0004 7.40637C8.56769 7.40637 7.40625 8.56781 7.40625 10.0005C7.40625 11.4332 8.56769 12.5947 10.0004 12.5947Z"
                    fill="#F6F6F6"
                    style={{
                      fill: "#F6F6F6 color(display-p3 0.9647 0.9647 0.9647)",
                      fillOpacity: 1,
                    }}
                  />
                </svg>
              </Link>
            </Button>
            <div className="items-center gap-x-2">
              <ModeToggle />
            </div>
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-grow flex-col gap-4 pb-8 pl-8 pr-8 lg:gap-6">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-2xl">
            Logged in application view
          </h1>
          <p>Edit /dashboard/page.tsx to change this view</p>
        </div>
        <div className="flex min-h-[calc(100svh-200px)] flex-1 items-center justify-center rounded-3xl border border-dashed bg-white shadow-sm">
          <div className="flex max-w-[500px] flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Explore the SaaS Starter
            </h3>
            <p className="mt-3 text-muted-foreground">
              This reference app demonstrates how to build a multi-tenant B2B
              SaaS application powered by Auth0 by Okta.
            </p>
            <p className="mt-3 text-muted-foreground">
              Head over to the Settings Dashboard to explore common
              administrative capabilities like membership management, single
              sign-on configuration, and security policies.
            </p>
            <div className="mt-8">
              <Link href="/dashboard/organization/general" className="w-full">
                <Button className="w-full">
                  Navigate to Settings
                  <ArrowRightIcon className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-muted-foreground">
              (You must be logged in with an &quot;admin&quot; role in your
              organization.)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
