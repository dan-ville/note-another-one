import { useEffect } from "react"
import { Note } from "../types"

export function useRegisterNotes(notes: Note[]) {
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
}
