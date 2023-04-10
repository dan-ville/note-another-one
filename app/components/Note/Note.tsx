"use client"
import React, { useRef, useState } from "react"
import { Note as NoteInterface } from "../../types"
import styles from "./Note.module.scss"

interface Props {
  note: NoteInterface
  updateNote: (id: string) => (note: Partial<NoteInterface>) => void
}

interface ModalProps {
  modalRef: React.RefObject<HTMLDialogElement>
  formValues: {
    title?: string
    content?: string
  }
  closeModal: (note: NoteInterface) => void
}
const NoteModal = ({
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
    <dialog ref={modalRef} className={styles["dialog"]}>
      <input
        type="text"
        placeholder={form.title}
        name="title"
        value={form.title}
        onChange={onInputChange}
        className={styles["title-input"]}
      />
      <textarea
        rows={5}
        name="content"
        value={form.content}
        onChange={onInputChange}
        className={styles["content-input"]}
      />
      <button onClick={() => closeModal(form)}>Save</button>
    </dialog>
  )
}

const Note = ({ note: { title, content, id }, updateNote }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  function openModal() {
    modalRef?.current?.showModal()
  }

  function closeModal(note: NoteInterface) {
    updateNote(id!.toString())(note)
    modalRef?.current?.close()
  }

  return (
    <>
      <button onClick={() => openModal()} className={styles["note-container"]}>
        <div>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      </button>
      <NoteModal
        formValues={{ title, content }}
        closeModal={closeModal}
        modalRef={modalRef}
      />
    </>
  )
}

export default Note
