"use client"
import React from "react"
import "./NewNote.scss"

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
        className="note-title"
        type="text"
        placeholder={title || `Title`}
        name="title"
        value={title}
        onChange={onInputChange}
      />
      <textarea
        className="note-content"
        rows={5}
        name="content"
        value={content}
        onChange={onInputChange}
        placeholder="Note..."
      />
      <div className="note-footer">
        <button onClick={() => createNote()} className="save-button">
          Save
        </button>
      </div>
    </div>
  )
}

export default NewNote
