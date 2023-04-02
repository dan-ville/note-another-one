"use client"
import { useState } from "react"
import { Note as NoteInterface } from "./types"
import Note from "./components/Note"

export default function Home() {
  const [notes, setNotes] = useState<NoteInterface[]>([])

  const updateNote = (id: string) => (note: Partial<NoteInterface>) => {
    const target = notes.find((note) => note.id == id)
    const updated = { ...target, ...note }
    setNotes(() => notes.map((x) => (x.id == id ? updated : x)))
  }


  return (
    <main>
      <div className="notes-grid">
        
        {notes.map((note, key) => (
          <Note key={key} note={note} updateNote={updateNote} />
        ))}
      </div>
    </main>
  )
}
