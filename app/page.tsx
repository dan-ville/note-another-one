import { Note as NoteInterface } from "./types"
import NotesGrid from "./components/NotesGrid/NotesGrid"
import "./style.scss"
import { Suspense } from "react"

export default async function Home() {
  const response = await fetch("http://localhost:8080/notes", {
    cache: "no-store", // ! temporary solution until client state is being passed up to server
  })
  const notes: NoteInterface[] = await response.json()

  return (
    <Suspense>
      <main>
        <NotesGrid notes={notes} />
      </main>
    </Suspense>
  )
}
