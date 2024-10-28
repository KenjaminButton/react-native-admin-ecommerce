// Check user is authenticated && admin before redirecting to admin page
// IF user is not authenticated, return children
// children is ./page.tsx

import { ADMIN } from "@/constants/constants";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";


export default async function AuthLayout({children}: Readonly<{
  children: ReactNode;

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
    if (data.type === ADMIN) return redirect('/admin')
  }
  return <>{children}</>
}