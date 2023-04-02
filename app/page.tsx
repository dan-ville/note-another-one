"use client"
import { useState } from "react"
import { Note as NoteInterface } from "./types"
import Note from "./components/Note"

const formInitialValues = {
  title: "",
  content: "",
}
export default function Home() {
  const [notes, setNotes] = useState<NoteInterface[]>([])
  const [form, setForm] = useState(formInitialValues)
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

  const saveNewNote = () => {
    const newNote = { ...form, id: (Math.random() * 10000).toString() }
    setNotes((prev) => [...prev, newNote])
    setForm(formInitialValues)
  }

  return (
    <main>
      <div className="notes-grid">
        <div className="note-container">
          <input
            type="text"
            placeholder={form.title}
            name="title"
            value={form.title}
            onChange={onInputChange}
          />
          <textarea
            rows={5}
            defaultValue={form.content}
            name="content"
            value={form.content}
            onChange={onInputChange}
          />
          <button onClick={saveNewNote}>Save</button>
        </div>
        {notes.map((note, key) => (
          <Note key={key} note={note} updateNote={updateNote} />
        ))}
      </div>
    </main>
  )
}
