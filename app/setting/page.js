import { Header } from "@/components/header"
import { SettingPage } from "@/components/setting-page"

export default function Setting() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto">
        <SettingPage />
      </main>
    </div>
  )
}
