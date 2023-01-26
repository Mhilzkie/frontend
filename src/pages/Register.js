import '../App.css';
import axios from "axios";
import {Navigate} from "react-router-dom";
import {useState} from "react";

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();
 
        await axios.post('http://localhost:4001/register',{
            username,password
        });

        // axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;

        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to="/login"/>;
    }

    return <main className="form-signin container">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
                <input type="username" className="form-control" id="floatingInput" placeholder="username"
                       onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </main>
}