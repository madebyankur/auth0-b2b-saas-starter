import { PageHeader } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { appClient, managementClient } from '@/lib/auth0';

import { DisplayNameForm } from './display-name-form';

export default async function GeneralSettings() {
  const session = await appClient.getSession()
  const { data: org } = await managementClient.organizations.get({
    id: session!.user.org_id,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="General Settings"
        description="Update your organization's general settings."
      />

      <DisplayNameForm
        organization={{
          id: org.id,
          slug: org.name,
          displayName: org.display_name,
        }}
      />
    </div>
  )
}
