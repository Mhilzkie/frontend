import {BrowserRouter,  Route,  Routes, Link} from "react-router-dom";
import './App.css';
import React from 'react';
import TodoListPage from "./pages/TodoListPage";

// import LoginPage from "./pages/LoginPage";
import { Login } from "./pages/login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  render(){
    return (
      
      <BrowserRouter>
      <header className="p-3 text-bg-dark">
      <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
         
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to = "/" className="nav-link px-2 text-white">Home</Link></li>
        </ul>

       

        <div className="text-end">
          <Link to = "/login" type="button" className="btn btn-outline-light me-2">Login</Link>
          <Link to = "/register" type="button" className="btn btn-outline-light me-2">Sign-up</Link>
        </div>
      </div>
    </div>
  </header>
        <Routes>
        {/* <Route path="/TodoListPage" element={<TodoListPage/>}></Route> */}
          <Route path="/todo" element={<TodoListPage/>}></Route>
          {/* <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route> */}
        </Routes>
      </BrowserRouter>
    )
  }
}