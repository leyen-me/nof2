import { Header } from "@/components/header"
import { InfoBar } from "@/components/info-bar"
import { LivePage } from "@/components/live-page"

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      <Header />
      <InfoBar />
      <main className="flex-1 overflow-hidden p-4">
        <LivePage />
      </main>
    </div>
  )
}
