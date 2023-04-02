"use client"
import React from "react"
import "./NewNote.module.scss"

interface Props {
  values: {
    title?: string
    content?: string
  }
  createNote: () => void
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

const NewNote = ({
  values: { title, content },
  onInputChange,
  createNote,
}: Props) => {
  return (
    <div className="note-container">
      <input
        type="text"
        placeholder={title}
        name="title"
        value={title}
        onChange={onInputChange}
      />
      <textarea
        rows={5}
        defaultValue={content}
        name="content"
        value={content}
        onChange={onInputChange}
      />
      <button onClick={() => createNote()}>Save</button>
    </div>
  )
}

export default NewNote
