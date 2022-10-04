import { useState } from "react";

export default function Todo({ title, description, author, created }) {
  const [check, setCheck] = useState(false);
  const [status, setStatus] = useState("");

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setStatus(new Date(Date.now()).toString());
    } else {
      setStatus("");
    }

    setCheck(!check);
  };

  return (
    <div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div>
        <small>
          Author: <b>{author}</b> on <b> {created} </b>{" "}
        </small>
        <br />
        <small>
          Status: <b>{check ? "Completed on " : "Incomplete"}</b>
        </small>
        <small>{status}</small>
      </div>

      <input id="check" type="checkbox" onChange={handleCheckbox} />
    </div>
  );
}
