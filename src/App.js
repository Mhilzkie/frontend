import {
  BrowserRouter,
  Route,
  Routes,      
} from "react-router-dom";

import React from 'react';
import TodoListPage from "./pages/TodoListPage";
import LoginPage from "./pages/LoginPage";
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
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>}></Route>
          <Route path="/todo" element={<TodoListPage></TodoListPage>}>
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}