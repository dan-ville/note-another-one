import { BibleReader } from "./components/BibleReader/BibleReader"
import "./style.scss"

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <h1>Nebuchadnezzar Notes</h1>
        {/* @ts-expect-error Server Component */}
        <BibleReader />
        {children}
      </body>
    </html>
  )
}
