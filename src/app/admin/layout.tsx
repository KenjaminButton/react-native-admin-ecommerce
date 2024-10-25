import { ReactNode } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  // Todo: Check if user is an admin to authorize using admin panel.
  return (
    <>
    
      {children}
    </>
  )
}