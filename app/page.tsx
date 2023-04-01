"use client"
import Image from "next/image"
import { Inter } from "next/font/google"
import { useState } from "react"
import { Note as NoteInterface } from "./types"
import Note from "./components/Note"

export default function Home() {
  const [notes, setNotes] = useState<NoteInterface[]>(
    Array(10).fill({ title: "Test", content: "This is cool." })
  )

  return (
    <main>
      <div className="notes-grid">
        {notes.map((note, key) => (
          <Note key={key} note={note} />
        ))}
      </div>
    </main>
  )
}
