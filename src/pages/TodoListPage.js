import BaseComponent from '../BaseComponent';
import axios from 'axios';

var sID,stask;
export default class TodoListPage extends BaseComponent {
    constructor(props) {
      super(props);
      this.state = {
        tasks: []
      }
    }
  
    componentDidMount = () => {
      fetch(`http://localhost:4001/tasks?id=${document.cookie.split(';')[0].split('=')[1]}`)
        .then(res =>res.json())
        .then(response => {
            // console.log(response.results);
            this.setState({
              tasks: [...response.results]
            })
          }
        )
    }
  
    formSubmit = (e) => {
      e.preventDefault();
      const userId = document.cookie.split(';')[0].split('=')[1];
      axios.post('http://localhost:4001/tasks', {
        todo: e.target.todo.value,
        user: userId
      }).then((response) => {
        this.setState({
          tasks: [
            ...this.state.tasks,
            {task: e.target.todo.value}
          ]
        })
      });
    }
  
    
    deleteRow(id, e){  
      // const confirmDelete = window.confirm(`Delete the entry with id ${id}?`);
      // if (confirmDelete){
        axios.delete(`http://localhost:4001/tasks/${id}`)
        .then(() => {
          const updatedIndex = this.state.tasks.findIndex(task => task.id === id);
          // get index of updated entry on array
          this.state.tasks[updatedIndex].deletedAt = new Date().toISOString();
          this.setState({
            tasks: [
              ...this.state.tasks
            ]
          })
        });
  
    } 
  
    selectTask(task,id, e){
      document.getElementById("new-todo-input").value = "";
      document.getElementById("new-todo-input").value = task;
      sID = id;
      stask = document.getElementById("new-todo-input").value;
    }
  
    selectupdateRow(id, e){
      id = sID;
      const task =  document.getElementById("new-todo-input").value;
      const updatedTask = { task };
      axios.put(`http://localhost:4001/tasks/${id}` , updatedTask)
        .then(response => {
          const updatedIndex = this.state.tasks.findIndex(task => task.id === id);
          this.state.tasks[updatedIndex].task = task;
          this.setState({
            tasks: [
              ...this.state.tasks
            ]
          })
        });
    }
      
  
    render() {
      return (
        
        <div className="todoapp stack-large">
          <h1>TodoMatic</h1>
          <form onSubmit={this.formSubmit}>
            <h2 className="label-wrapper">
              <label htmlFor="new-todo-input" className="label__lg">
                What needs to be done?
              </label>
            </h2>
            <input
              type="text"
              id="new-todo-input"
              className="input input__lg"
              name="todo"
              autoComplete="off"
            />
            <button type="submit" className="btn btn__primary btn__lg">
              Add
            </button>
            
          </form>
          <button onClick={() => this.selectupdateRow(stask)}className="btn btn__primary btn__lg">
              Update
          </button>
          <div className="filters btn-group stack-exception">
            <button type="button" className="btn toggle-btn" aria-pressed="true">
              <span className="visually-hidden">Show </span>
              <span>all</span>
              <span className="visually-hidden"> tasks</span>
            </button>
            <button type="button" className="btn toggle-btn" aria-pressed="false">
              <span className="visually-hidden">Show </span>
              <span>Active</span>
              <span className="visually-hidden"> tasks</span>
            </button>
            <button type="button" className="btn toggle-btn" aria-pressed="false">
              <span className="visually-hidden">Show </span>
              <span>Completed</span>
              <span className="visually-hidden"> tasks</span>
            </button>
          </div>
          <h2 id="list-heading">
            3 tasks remaining
          </h2>
          <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
          >
            {
              this.state.tasks.map((task, index) => {
                if (!task.deletedAt){
                  return (
                    <li key={index}>
                      {task.id}
                      <span className="visually-hidden"> </span>
                      <span className="visually-hidden"> </span>
                      {task.task}
                      <span className="visually-hidden"> </span>
                      <button onClick={(e) => this.selectTask(task.task,task.id, e)} className="btn btn__primary btn__lg">
                        Select
                      </button>
                      <span className="visually-hidden"> </span>
                      <button onClick={(e) => this.deleteRow(task.id, e)} className="btn btn__primary btn__lg">
                        Delete
                      </button>
                    </li>
                  )
                }else{
                  return (
                    <li key={index}>
                      <s>{task.id}</s>
                    <span className="visually-hidden"> </span>
                    <span className="visually-hidden"> </span>
                    <s>{task.task}</s>
                    <span className="visually-hidden"> </span>
                    <button onClick={(e) => this.selectTask(task.task,task.id, e)} className="btn btn__primary btn__lg">
                      Select
                    </button>
                    <span className="visually-hidden"> </span>
                    <button onClick={(e) => this.deleteRow(task.id, e)} className="btn btn__primary btn__lg">
                      Delete
                    </button>
                  </li>
                  )
                }
              })
            }
          </ul>
        </div>
      );
    }
  }