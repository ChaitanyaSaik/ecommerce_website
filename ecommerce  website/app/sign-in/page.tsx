import { SignInForm } from "@/components/auth/sign-in-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function SignInPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container">
          <SignInForm />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

