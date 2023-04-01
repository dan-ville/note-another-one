"use client"
import React, { useRef, useState } from "react"
import { Note } from "../types"
import "./Note.css"

interface Props {
  note: Note
}

const Note = ({ note: { title, content } }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const NoteModal = () => (
    <dialog ref={modalRef}>
      <form method="dialog" className="">
        <input type="text" placeholder={title} />
        <textarea rows={5} defaultValue={content} />
        <button onClick={() => closeModal()}>Save</button>
      </form>
    </dialog>
  )

  function openModal() {
    modalRef?.current?.showModal()
  }

  function closeModal() {
    modalRef?.current?.close()
  }

  return (
    <>
      <button onClick={() => openModal()} className="note-container">
        <div>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      </button>
      <NoteModal />
    </>
  )
}

export default Note
