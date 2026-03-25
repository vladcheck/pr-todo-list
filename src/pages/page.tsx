import useNotes from "@/shared/hooks/useNotes";
import useServiceWorker from "@/shared/hooks/useServiceWorker";
import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const { notes, addNote } = useNotes();
  useServiceWorker("sw.js");

  return (
    <>
      <h1>А вот и «Заметки» - наше первое оффлайн-приложение</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.length) {
            addNote(text);
            setText("");
          }
        }}
        id="note-form"
        className="row"
      >
        <input
          className="col-9"
          type={text}
          id="note-input"
          placeholder="Введите заметку"
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="col-3" type="submit">
          Добавить
        </button>
      </form>
      <ul id="notes-list">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </>
  );
}
