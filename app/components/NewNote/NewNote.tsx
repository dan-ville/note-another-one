"use client"
import React, { useRef, useState } from "react"
import styles from "./NewNote.module.scss"
import { Note as NoteInterface } from "@/app/types"

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<NoteInterface[]>>
}

const formInitialValues = {
  title: "",
  content: "",
}

const NewNote = ({ setNotes }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const [fields, setFields] = useState({ title: "", content: "" })

  const focusTitle = () => {
    titleRef?.current?.focus()
  }

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({ ...fields, [event.target.name]: event.target.value })
  }

  const createNote = async () => {
    const res = await fetch(`http://localhost:8080/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: fields.title, content: fields.content }),
    })
    const newNote = await res.json()
    return newNote
  }

  const onSave = async () => {
    const newNote: NoteInterface = await createNote()
    setNotes((prev) => [...prev, newNote])
    setFields(formInitialValues)
    focusTitle()
  }

  return (
    <div className={styles["note-container"]}>
      <input
        className={styles["note-title"]}
        type="text"
        placeholder={fields.title || `Title`}
        name="title"
        value={fields.title}
        onChange={onInputChange}
        ref={titleRef}
      />
      <textarea
        className={styles["note-content"]}
        rows={5}
        name="content"
        value={fields.content}
        onChange={onInputChange}
        placeholder="Note..."
      />
      <div className={styles["note-footer"]}>
        <button onClick={onSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  )
}

export default NewNote
