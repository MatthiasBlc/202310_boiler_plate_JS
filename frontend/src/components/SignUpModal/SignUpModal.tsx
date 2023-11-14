import { useForm } from "react-hook-form";
import { User } from "../../models/user";
import APIManager, { SignUpCredentials } from "../../services/api";
import Modal from "../Modal";
import TextInputField from "../form/TextInputField";
import styleUtils from "../../styles/utils.module.css";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await APIManager.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }


  return (
    <div className="container">

      <Modal onClose={onDismiss}>
        <h3 className="font-bold text-lg">
          Sign Up
          <button className="btn btn-primary" onClick={onDismiss}>
            close
          </button>
        </h3>
        <form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            required
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            required
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            required
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <div className="modal-action">
            <button
              type="submit"
              className={`btn btn-primary ${styleUtils.width100}`}
              disabled={isSubmitting}
            >
              Save
            </button>

          </div>

        </form>

      </Modal>
    </div>
  );
}

export default SignUpModal;