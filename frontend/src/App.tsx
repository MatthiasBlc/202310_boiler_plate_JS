import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import APIManager from "./services/api";
import Note from "./components/Note/Note";
import styles from "./styles/NotesPage.module.css";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const listNotes = async () => {
      const data = await APIManager.loadNotes();
      setNotes(data);
    };
    listNotes();
  }, []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id}>
            <Note note={note} className={styles.note} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
