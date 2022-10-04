export default function Logout({user, dispatch}) {
    
    return (
    <form onSubmit={e => { e.preventDefault(); dispatch({type: "LOGOUT"}); }}>
    Hello, <b>{user} </b>
    <input type="submit" value="Logout" />
    </form>
    )
    }
    