import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal/LoginModal";
import NavBar from "./components/Navbar/NavBar";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import { User } from "./models/user";
import APIManager from "./services/api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await APIManager.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <div>
        <>
          {loggedInUser ?
            <NotesPageLoggedInView />
            : <NotesPageLoggedOutView />}
        </>

      </div>

      {showSignUpModal &&
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />

      }

      {showLoginModal &&
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />

      }

    </>
  );
}

export default App;
