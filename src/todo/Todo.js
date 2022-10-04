import { useState } from 'react'

export default function Todo ({ title, description, author, created}) {

    const [checked, setChecked] = useState(false)
    const [completed, setCompleted] = useState("N/A");

    const handleCheck = (event) => {
        if(event.target.checked){
            setCompleted((new Date(Date.now())).toString());
        }
        else{
            setCompleted("N/A");
        }

        setChecked(!checked)
    }

    return (
        <div>
            <div>
                <h2>{title}</h2>
                <small>Author: <b>{author}</b></small>
            </div>
            <div>
                <p>{description}</p>

            </div>
            <div>
                <br/>
                <small>Date Created: <b> {created} </b></small>
                <br/>
                <small>Status: <b>{checked ? "Complete" : "Incomplete"}</b></small>
                <br/>
                <small>Date Finished: <b>{completed}</b></small>
            </div>

            <input id="check" type="checkbox" onChange={handleCheck}/>
        </div>
    )
}