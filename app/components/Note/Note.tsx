"use client"
import React, { useEffect, useRef, useState } from "react"
import { Note as NoteInterface } from "../../types"
import styles from "./Note.module.scss"

interface NoteModalProps {
  note: NoteInterface
  updateNote: (updatedNote: NoteInterface) => void
  noteRef: React.RefObject<HTMLDivElement>
}

const NoteModal: React.FC<NoteModalProps> = ({ note, updateNote, noteRef }) => {
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
    // re-apply focus to the note
    if (noteRef.current) {
      noteRef.current.focus()
    }
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
        className={styles["content-input"]}
        value={updatedNote.content}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  )
}

interface NoteProps {
  note: NoteInterface
  updateNote: (updatedNote: NoteInterface) => void
}

const Note: React.FC<NoteProps> = ({ note, updateNote }) => {
  const [showModal, setShowModal] = useState(false)
  const noteRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setShowModal(!showModal)
  }

  // callback for the event listener making the note divs keyboard focusable
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      // Open or close the modal when Enter or Space is pressed
      setShowModal(!showModal)
    }
  }

  useEffect(() => {
    if (showModal && noteRef.current) {
      noteRef.current.focus()
    }
  }, [showModal])

  return (
    <div>
      <div
        onClick={handleClick}
        ref={noteRef}
        tabIndex={0} // tab index makes the div tab focusable, value of 0 makes it so the natural tab index is preserved
        className={styles["note-container"]}
        onKeyDown={handleKeyDown}
        role="button"
        aria-pressed={showModal}
      >
        <h3 className={styles["title-input"]}>{note.title}</h3>
        <p className={styles["content-input"]}>{note.content}</p>
      </div>
      {showModal && (
        <NoteModal
          note={note}
          noteRef={noteRef}
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
