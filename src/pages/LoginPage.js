import React from 'react';
import axios from 'axios';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    login(e){
        e.preventDefault();
        console.log(e.target.username.value);
        console.log(e.target.password.value);
        axios.post('http://localhost:4001/login', {
            username: e.target.username.value,
            password: e.target.password.value
        }).then((response) => {
            console.log(response);
            document.cookie = response.data.length > 0 ? `user=${response.data[0].id}`: '';
            window.location.href = response.data.length > 0 ? '/todo': '/';

        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <label htmlFor="username">Enter Username</label>
                    <input name="username" type="text"></input>
                    <label htmlFor="password">Enter password</label>
                    <input name="password" type="password"></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}