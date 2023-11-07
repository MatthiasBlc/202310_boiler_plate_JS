import { useForm } from "react-hook-form";
import Modal from "../Modal";
import { Note } from "../../models/note";
import APIManager, { NoteInput } from "../../services/api";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await APIManager.updateNote(noteToEdit.id, input);
      } else {
        noteResponse = await APIManager.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div className="container">
      <Modal onClose={onDismiss}>
        <h3 className="font-bold text-lg">
          {noteToEdit ? "Edit note" : "Add note"}{" "}
        </h3>
        <p className="py-4">modal content text for test</p>
        <form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full max-w-xs"
              required
              {...register("title", { required: "Required" })}
            />
            {/* need a feedback for required */}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Text</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Text"
              required
              {...register("text", { required: "Required" })}
            />
            {/* need a feedback for required */}
          </div>
        </form>

        <div className="modal-action">
          <button
            type="submit"
            form="addEditNoteForm"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Save
          </button>
          <button className="btn btn-primary" onClick={onDismiss}>
            close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddEditNoteDialog;
