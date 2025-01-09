import { useNavigate } from "react-router-dom"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function Header() {
  const navigate = useNavigate()
  const supabaseClient = useSupabaseClient()

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut()
    navigate("/login")
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav onSignOut={handleSignOut} />
        </div>
      </div>
    </div>
  )
}
