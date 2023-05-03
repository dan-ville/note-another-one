"use client"
import { Note as NoteInterface } from "@/app/types"
import React, { Suspense, useState } from "react"
import Note from "../Note/Note"
import NewNote from "../NewNote/NewNote"

interface Props {
  notes: NoteInterface[]
}
const NotesGrid = ({ notes: serverNotes }: Props) => {
  const [notes, setNotes] = useState(serverNotes) // ! temp solution until using app context

  return (
    <Suspense>
      <NewNote setNotes={setNotes} />
      <div className="notes-grid">
        {notes
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ) // show notes in order of most recently created
          .map((note) => (
            <Note key={note._id} note={note} setNotes={setNotes} />
          ))}
      </div>
    </Suspense>
  )
}

export default NotesGrid
