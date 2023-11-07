import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import APIManager from "./services/api";
import Note from "./components/Note/Note";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import AddEditNoteDialog from "./components/AddNoteDialog/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  // const [open, setOpen] = useState(false);
  // const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const listNotes = async () => {
      const data = await APIManager.loadNotes();
      setNotes(data);
    };
    listNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await APIManager.deleteNote(note.id);
      setNotes(notes.filter((existingNote) => existingNote.id !== note.id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <>
      <button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </button>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div key={note.id}>
            <Note
              note={note}
              onNoteClicked={setNoteToEdit}
              onDeleteNoteClicked={deleteNote}
              className={styles.note}
            />
          </div>
        ))}
      </div>
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote.id === updatedNote.id ? updatedNote : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
}

export default App;
