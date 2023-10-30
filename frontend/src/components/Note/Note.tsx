import { Note as NoteModel } from "../../models/note";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  return <h1>{note.title}</h1>;
};
export default Note;
