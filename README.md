# **B2B SaaS Starter Kit** from **Auth0 by Okta**

A secure and high-performance starting point for building B2B SaaS web applications.

## Overview

![A screenshot of the login view](https://i.imgur.com/teXrIAo.png)

> Ready to begin? Jump ahead to the [Getting Started](#getting-started) section.

This sample application provides developers with a solid foundation to kickstart their journey into building a business-to-business software-as-a-service (B2B SaaS) application. With a carefully selected stack of well-documented and widely adopted technologies, along with seamless integration with Auth0 for identity and login management, this starter kit aims to streamline the development process, enabling you to focus on building innovative solutions for your customers instead of worrying about being B2B or enterprise-ready.

It incorporates best practices and industry-standard technologies to provide a robust and scalable solution for building secure software, with all the capabilities you need to be competitive, resilient, and scalable. The project includes the architecture and components you need to get started, authentication and authorization powered by Auth0, and deployment instructions that make it easy to move to staging or production when you're ready.

## Target use case

Use this to build applications that require a shared user model:
* Single User Pool in a shared DB
* Home realm discovery
* Domain claiming

## Included capabilities
* Logged out product landing page experience
* Logged in application experience
* Sign up with Organization creation
* Subscription tiers and upgrade/downgrade workflows *(coming soon)*
* MFA for email/password accounts
* User management with invitation workflows, create/delete user capabilities, and roles
* Self-service SSO configuration using
  * OIDC 
  * SAML *(coming soon)*
* Just-in-time user provisioning OR automatic directory sync with SCIM *(coming soon)*
* API client management with self-service create/delete capabilities
* Configurable security policies:
  * Enforce MFA
  * Session limits *(coming soon)*
  * Allow email/password accounts for outside collaborators while enforcing SSO *(coming soon)*
  * Break-glass access for admin roles *(coming soon)*
* Self-service user profile management, password reset, and MFA configuration

## Getting Started

### Prerequisites
1. Node.js v20 or later is required to run the bootstrapping process. We recommend using [`nvm`](https://github.com/nvm-sh/nvm).
1. You must have [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or a comparable package manager installed in your development environment. These instructions assume that you're using `npm`.
1. **Create a fresh Auth0 tenant** which will be configured automatically by our bootstrapping command. See [Create Tenants](https://auth0.com/docs/get-started/auth0-overview/create-tenants) in the Auth0 docs if you need help.
    
    Creating a new tenant before you continue is highly recommended, so that you don't accidentally change the configuration in any existing Auth0 projects you might have.

### Part One: Clone and install dependencies
1. Clone this repo to your development environment
1. Install dependencies: `npm install`

### Part Two: Install and Log In with the Auth0 CLI
This project uses the Auth0 CLI to make setting up your tenant a lot easier, by scripting away as much manual work as possible. If you want to familiarize yourself with the Auth0 CLI, read [Auth0 CLI Basics](https://developer.auth0.com/resources/labs/tools/auth0-cli-basics).

1. You will need to install the Auth0 CLI. It will be used by the bootstrap script to create the resources needed for this sample in your Auth0 tenant. Instructions for installation are available at the [Auth0 CLI github repo](https://github.com/auth0/auth0-cli).

    **For example**, for users on OSX using , you can run the following command:
    ```shell
    brew tap auth0/auth0-cli && brew install auth0
    ```

    You can confirm whether or not the CLI is correctly installed by running the following command:

    ```shell
    auth0 --version
    ```
    You should see in response the CLI version number printed out, like this:
    ```shell
    auth0 version 1.4.0 54e9a30eeb58a4a7e40e04dc19af6869036bfb32
    ```

1. Log in by entering the following command and following the instructions to choose a specific tenant to authenticate with:
  
    ```shell
    auth0 login --scopes "update:tenant_settings,create:connections,create:client_grants,create:email_templates,update:guardian_factors"
    ```

    Be sure to select **As a user** when prompted: *"How would you like to authenticate?"*. This take you through a flow to securely retrieve a Management API token for your Auth0 tenant.

    > ## **Important** 
    > At the **Authorize App** step, be sure to select the correct tenant. This is the tenant that will be bootstrapped in the next steps.
 
### Part Three: Bootstrap the Auth0 tenant
Behind the scenes, the bootstrap script in this step will use the Auth0 CLI to provision the resources required for this sample application: 
  * Creating the appropriate clients (called Applications in Auth0)
  * Creating admin and member roles, 
  * Creating actions for setting roles and security policies
  * Creating email and login templates
  * Enabling MFA factors

Finally, it will save environment variables for your tenant in the application directory.

1. Run the following command to configure the tenant that the Auth0 CLI is currently logged into:

    ```shell
    npm run auth0:bootstrap
    ```

    Once the script has successfully completed, a `.env.local` file containing the environment variables will be written to the root of your project directory.

### Step Four: Run the sample application
1. Run the development server: `npm run dev`
1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
    
    > Note: If you're running the application on a different port, adjust the provided localhost URL accordingly. 
    
1. Start editing - for example, modify `app/page.tsx`. The browser will auto-update as you edit the file.

## Misc

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Auth0, take a look at the following resources:
- [Understand how Auth0 Organizations Work](https://auth0.com/docs/manage-users/organizations/organizations-overview) - learn about how this project achieves multi-tenancy
- [Customize](https://auth0.com/docs/customize) - learn how to brand and internationalize all Auth0 interactions with your end-users

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Contributing
See [CONTRIBUTING](./CONTRIBUTING.md) for information.
