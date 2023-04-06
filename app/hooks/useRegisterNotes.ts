import { useEffect } from "react"
import { Note } from "../types"

interface Params {
  notes: Note[]
}

export function useRegisterNotes(notes: Note[]) {
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])
}
