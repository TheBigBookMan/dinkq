import { Danger } from "../features/account/components/Danger"
import { Profile } from "../features/account/components/Profile"
import { Security } from "../features/account/components/Security"
import { SignIn } from "../features/account/components/SignIn"
import { useAccountData } from "../features/account/hooks"

const AccountPage = () => {
  const accountData = useAccountData();

  const providers = [
    { id: 'line', label: 'LINE', connected: accountData.line },
    { id: 'google', label: 'Google', connected: accountData.google },
    { id: 'email', label: 'Email code', connected: accountData.emailCode },
  ]

  return (
    <div className="space-y-4 px-2">
      <header>
        <h1 className="font-display text-2xl font-bold">Account</h1>
        <p className="text-sm text-ink-muted">Your profile and how you sign in.</p>
      </header>

      <Profile name={accountData.name} email={accountData.email} />
      <SignIn providers={providers} />
      <Security />
      <Danger />
    </div>
  )
}

export default AccountPage