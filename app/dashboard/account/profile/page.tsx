import { appClient } from "@/lib/auth0"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/page-header"

import { DisplayNameForm } from "./display-name-form"

export default appClient.withPageAuthRequired(
  async function Profile() {
    const session = await appClient.getSession()

    return (
      <div className="space-y-6">
        <PageHeader
          title="Profile"
          description="Manage your personal information."
        />

        <DisplayNameForm displayName={session?.user.name} />
      </div>
    )
  },
  { returnTo: "/dashboard/account/profile" }
)
