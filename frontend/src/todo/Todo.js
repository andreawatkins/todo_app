import { useState } from "react";
import { useContext } from "react";
import { StateContext } from "../contexts";

export default function Todo({
  title,
  description,
  author,
  created,
  checked,
  status,
}) {
  const [check, setCheck] = useState(false);
  const { state, dispatch } = useContext(StateContext);

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
          Status: <b>{checked ? "Completed on " : "Incomplete"}</b>{" "}
          <b>{status}</b>
        </small>
      </div>
    </div>
  );
}
