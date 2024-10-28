import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RenderMounted } from "@/components/render-mounted";
import { ADMIN } from "@/constants/constants";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react"


export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  
  const supabase = createClient()

  const {data: authData} = await (await supabase).auth.getUser();
  if (authData?.user) {
    const {data, error} = await (await supabase)
    .from('users')
    .select("*")
    .eq('id', authData.user.id)
    .single()
    if (error || !data) {
      console.log('Error fetchign user data', error)
      return;
    }
    if (data.type === ADMIN) return redirect('/')
  }
  return (
    <RenderMounted>
      <Header />
        <main className="main-h-[calc(100svh-128px)] py-3">
          {children}
        </main>
      <Footer />
    </RenderMounted>
  )
}
