"use client"
import React, { useEffect, useRef, useState } from "react"
import { Note as NoteInterface } from "../../types"
import styles from "./Note.module.scss"

interface Props {
  note: NoteInterface
  updateNote: (updatedNote: NoteInterface) => void
}

const NoteModal: React.FC<Props> = ({ note, updateNote }) => {
  const [updatedNote, setUpdatedNote] = useState<NoteInterface>(note)

  useEffect(() => {
    setUpdatedNote(note)
  }, [note])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedNote({
      ...updatedNote,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = () => {
    updateNote(updatedNote)
  }

  return (
    <div className={styles["dialog"]}>
      <input
        type="text"
        name="title"
        className={styles["title-input"]}
        value={updatedNote.title}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        className={styles['content-input']}
        value={updatedNote.content}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  )
}

const Note: React.FC<Props> = ({ note, updateNote }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={styles["note-container"]}>
      <div onClick={handleClick}>
        <h3 className={styles["title-input"]}>{note.title}</h3>
        <p className={styles["content-input"]}>{note.content}</p>
      </div>
      {showModal && (
        <NoteModal
          note={note}
          updateNote={(updatedNote) => {
            updateNote(updatedNote)
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

export default Note
