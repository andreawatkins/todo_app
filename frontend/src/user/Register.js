import { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../contexts";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const { dispatch } = useContext(StateContext);

  //   function handleUsername(evt) {
  //     setUsername(evt.target.value);
  //   }
  function handlePassword(evt) {
    setPassword(evt.target.value);
  }
  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value);
  }

  const [status, setStatus] = useState("");
  const [user, register] = useResource((username, password) => ({
    url: "auth/register",
    method: "post",
    data: { username, password, passwordConfirmation: password },
  }));

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setStatus("Registration failed, try again later.");
      } else {
        setStatus("Registration successful. Please login now.");
      }
    }
  }, [user]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        register(username, password);
        //dispatch({ type: "REGISTER", username });
      }}
    >
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        name="register-password"
        id="register-password"
        value={password}
        onChange={handlePassword}
      />
      <label htmlFor="register-password-repeat">Repeat password:</label>
      <input
        type="password"
        name="register-password-repeat"
        id="register-password-repeat"
        value={passwordRepeat}
        onChange={handlePasswordRepeat}
      />
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== passwordRepeat
        }
      />
      <p>{status}</p>
    </form>
  );
}
