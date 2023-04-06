"use client"
import { useState } from "react"
import { Note as NoteInterface } from "./types"
import { NewNote, Note } from "./components"
import "./style.scss"
import { useRegisterNotes } from "./hooks/useRegisterNotes"

const formInitialValues = {
  title: "",
  content: "",
}

const storedNotes = localStorage.getItem("notes")

export default function Home() {
  const [notes, setNotes] = useState<NoteInterface[]>(
    storedNotes ? JSON.parse(storedNotes) : []
  )
  const [form, setForm] = useState(formInitialValues)

  useRegisterNotes(notes)

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const updateNote = (id: string) => (note: Partial<NoteInterface>) => {
    const target = notes.find((note) => note.id == id)
    const updated = { ...target, ...note }
    setNotes(() => notes.map((x) => (x.id == id ? updated : x)))
  }

  const createNote = () => {
    const newNote = { ...form, id: (Math.random() * 10000).toString() }
    setNotes((prev) => [...prev, newNote])
    setForm(formInitialValues)
  }

  return (
    <main>
      <NewNote
        values={form}
        createNote={createNote}
        onInputChange={onInputChange}
      />
      <div className="notes-grid">
        {notes.map((note, key) => (
          <Note key={key} note={note} updateNote={updateNote} />
        ))}
      </div>
    </main>
  )
}
