import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import APIManager from "./services/api";
import Note from "./components/Note/Note";
import styles from "./styles/NotesPage.module.css";
import AddNoteDialog from "./components/AddNoteDialog/AddNoteDialog";
import Modal from "./components/Modal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(true);

  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const listNotes = async () => {
      const data = await APIManager.loadNotes();
      setNotes(data);
    };
    listNotes();
  }, []);

  return (
    <>
      <div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div key={note.id}>
              <Note note={note} className={styles.note} />
            </div>
          ))}
        </div>
        {showAddNoteDialog && <AddNoteDialog />}

        <div className="container">
          {/* opens the modal */}
          <button className="btn btn-primary" onClick={handleToggle}>
            Hello
          </button>
          <Modal open={open} onClose={handleToggle}>
            <h3 className="font-bold text-lg">
              Congratulations random Internet user!
            </h3>
            <p className="py-4">
              You havve been selected for a chance to get one year of
              subscription to use Wikipedia for free!
            </p>
            <div className="modal-action">
              {/* closes the modal */}
              <button className="btn btn-primary" onClick={handleToggle}>
                Yay!
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
