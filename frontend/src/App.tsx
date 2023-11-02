import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import APIManager from "./services/api";
import Note from "./components/Note/Note";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import AddNoteDialog from "./components/AddNoteDialog/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  // const [open, setOpen] = useState(false);
  // const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const listNotes = async () => {
      const data = await APIManager.loadNotes();
      setNotes(data);
    };
    listNotes();
  }, []);

  return (
    <>
      <button
        className={`mb-4 ${styleUtils.blockCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </button>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id}>
            <Note note={note} className={styles.note} />
          </div>
        ))}
      </div>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </>
  );
}

export default App;
