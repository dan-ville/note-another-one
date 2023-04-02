"use client"
import React, { useRef, useState } from "react"
import { Note as NoteInterface } from "../../types"
import "./Note.module.scss"

interface Props {
  note: NoteInterface
  updateNote: (id: string) => (note: Partial<NoteInterface>) => void
}

interface ModalProps {
  isOpen: boolean
  modalRef: React.RefObject<HTMLDialogElement>
  formValues: {
    title?: string
    content?: string
  }
  closeModal: (note: NoteInterface) => void
}
const NoteModal = ({
  isOpen,
  formValues,
  modalRef,
  closeModal,
}: ModalProps) => {
  const [form, setForm] = useState(formValues)
  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <dialog open={isOpen} ref={modalRef} className="dialog">
      <input
        type="text"
        placeholder={form.title}
        name="title"
        value={form.title}
        onChange={onInputChange}
        className="title-input"
      />
      <textarea
        rows={5}
        defaultValue={form.content}
        name="content"
        value={form.content}
        onChange={onInputChange}
        className='content-input'
      />
      <button onClick={() => closeModal(form)}>Save</button>
    </dialog>
  )
}

const Note = ({ note: { title, content, id }, updateNote }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    // modalRef?.current?.showModal()
    setIsOpen(true)
  }

  function closeModal(note: NoteInterface) {
    updateNote(id!.toString())(note)
    // modalRef?.current?.close()
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={() => openModal()} className="note-container">
        <div>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      </button>
      <NoteModal
        formValues={{ title, content }}
        isOpen={isOpen}
        closeModal={closeModal}
        modalRef={modalRef}
      />
    </>
  )
}

export default Note
