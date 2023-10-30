import { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteModel } from "./models/note";
import APIManager from "./services/api";
import Note from "./components/Note/Note";

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
      <div className="App">
        {notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </div>
    </>
  );
}

export default App;
