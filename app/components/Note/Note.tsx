"use client"
import React, { useEffect, useRef, useState } from "react"
import { Note as NoteInterface } from "../../types"
import styles from "./Note.module.scss"
import { useOnClickOutside } from "@/app/hooks/useOnClickOutside"

interface NoteModalProps {
  note: NoteInterface
  updateNote: (updatedNote: NoteInterface) => void
  noteRef: React.RefObject<HTMLDivElement>
  modalRef: React.RefObject<HTMLDivElement>
  deleteNote: (id: NoteInterface["_id"]) => void
}

const NoteModal: React.FC<NoteModalProps> = ({
  note,
  updateNote,
  noteRef,
  modalRef,
  deleteNote,
}) => {
  const [fields, setFields] = useState<NoteInterface>(note)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:8080/notes/${note._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: fields.title, content: fields.content }),
    })
    const updatedNote: NoteInterface = await res.json()
    updateNote(updatedNote)
    // re-apply focus to the note
    if (noteRef.current) {
      noteRef.current.focus()
    }
  }

  return (
    <div className={styles["dialog-backdrop"]}>
      <div className={styles["dialog"]} ref={modalRef}>
        <input
          type="text"
          name="title"
          className={styles["title-input"]}
          value={fields.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          className={styles["content-input"]}
          value={fields.content}
          onChange={handleInputChange}
        />
        <div className={styles["actions-container"]}>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

interface NoteProps {
  note: NoteInterface
  setNotes: React.Dispatch<React.SetStateAction<NoteInterface[]>>
}

const Note: React.FC<NoteProps> = ({ note, setNotes }) => {
  const [values, setValues] = useState(note)
  const [showModal, setShowModal] = useState(false)
  const noteRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setShowModal(!showModal)
  }

  const closeModal = () => {
    setShowModal(false)
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

  useOnClickOutside(modalRef, closeModal)

  const deleteNote = async (id: string) => {
    closeModal()
    await fetch(`http://localhost:8080/notes/${note._id}`, {
      method: "DELETE",
    })
    console.log("note deleted")
    setNotes(notes => notes.filter(note => id !== note._id))
  }

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
        <h3 className={styles["title-input"]}>{values.title}</h3>
        <p className={styles["content-input"]}>{values.content}</p>
      </div>
      {showModal && (
        <NoteModal
          note={note}
          noteRef={noteRef}
          modalRef={modalRef}
          updateNote={(updatedNote) => {
            setValues(updatedNote)
            setShowModal(false)
          }}
          deleteNote={() => deleteNote(note._id)}
        />
      )}
    </div>
  )
}

export default Note
