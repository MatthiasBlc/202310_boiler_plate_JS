import { useForm } from "react-hook-form";
import { User } from "../../models/user";
import APIManager, { LoginCredentials } from "../../services/api";
import Modal from "../Modal";
import TextInputField from "../form/TextInputField";
import styleUtils from "../../styles/utils.module.css";


interface LoginModalProps {
  onDismiss: () => void,
  onLoginSuccessful: (user: User) => void,
}


const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await APIManager.login(credentials);
      onLoginSuccessful(user);

    } catch (error) {
      alert(error);
      console.error(error);

    }
  }

  return (

    <div className="container">

      <Modal onClose={onDismiss}>
        <h3 className="font-bold text-lg">
          Log In
          <button className="btn btn-primary" onClick={onDismiss}>
            close
          </button>
        </h3>
        <form id="logInForm" onSubmit={handleSubmit(onSubmit)}>
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
              Log In
            </button>

          </div>

        </form>

      </Modal>
    </div>

  );
}

export default LoginModal;