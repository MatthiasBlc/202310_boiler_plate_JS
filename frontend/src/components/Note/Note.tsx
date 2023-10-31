import styles from "../../styles/Note.module.css";
import { Note as NoteModel } from "../../models/note";
import { formatDate } from "../../utils/format.Date";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAT } = note;

  let createdUpdatedText: string;
  if (updatedAT > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAT);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <div
      className={`card w-96 bg-base-100 shadow-xl ${styles.noteCard} ${className}`}
    >
      <div className={`card-body ${styles.cardBody} `}>
        <h2 className={`card-title`}>{title}</h2>
        <p className={`${styles.cardText} `}>{text}</p>
        <div className="text-secondary">{createdUpdatedText}</div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">button</button>
        </div>
      </div>
    </div>
  );
};
export default Note;
