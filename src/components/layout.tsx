import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden border-r bg-background md:block md:w-64">
        <div className="flex flex-col">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold tracking-tight">MMDIGITAL</h2>
            <p className="text-sm text-muted-foreground">Marketing Solutions</p>
          </div>
          <Sidebar />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
