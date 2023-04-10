"use client"
import React from "react"
import styles from "./NewNote.module.scss"

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
    <div className={styles["note-container"]}>
      <input
        className={styles["note-title"]}
        type="text"
        placeholder={title || `Title`}
        name="title"
        value={title}
        onChange={onInputChange}
      />
      <textarea
        className={styles["note-content"]}
        rows={5}
        name="content"
        value={content}
        onChange={onInputChange}
        placeholder="Note..."
      />
      <div className={styles["note-footer"]}>
        <button onClick={() => createNote()} className="save-button">
          Save
        </button>
      </div>
    </div>
  )
}

export default NewNote
