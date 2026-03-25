import { useState } from "react";

export type Note = string;

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = () => {
    setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
  };

  const addNote = (text: string) => {
    const notes: string[] = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(text);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  };

  const preload = () => {
    if (notes.length === 0) {
      loadNotes();
    }
  };

  preload();
  return { notes, addNote };
}
