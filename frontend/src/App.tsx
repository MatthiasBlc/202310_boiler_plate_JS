import { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/note";
import APIManager from "./services/api";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const listNotes = async () => {
      const data = await APIManager.loadNotes();
      setNotes(data);
    };
    listNotes();
    // async function loadNotes() {
    //   try {
    //     const response = await fetch("http://localhost:5000/api/notes", {
    //       method: "GET",
    //     });
    //     console.log(response);

    //     const notes = await response.json();
    //     console.log(notes);
    //     setNotes(notes);
    //   } catch (error) {
    //     console.error(error);
    //     alert(error);
    //   }
    // }
    // loadNotes();
  }, []);

  return (
    <>
      <div className="App">
        hello
        {JSON.stringify(notes)}
      </div>
    </>
  );
}

export default App;
