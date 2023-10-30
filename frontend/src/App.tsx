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
      <h1 className="text-3xl font-bold text-red-500 underline text-center">
        Hello world!
      </h1>
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
        Button
      </button>
      <button className="btn">Button</button>
      <button className="btn btn-primary">Button</button>
      <button className="btn w-64 rounded-full">Button</button>
      <button className="btn btn-primary">One</button>
      <button className="btn btn-secondary">Two</button>
      <button className="btn btn-accent btn-outline">Three</button>

      <div className="App">
        {notes.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </div>
    </>
  );
}

export default App;
