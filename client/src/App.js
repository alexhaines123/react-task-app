import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import List from './List/List';
import CreateList from './List/CreateList';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    lists : [],
    newList : ''
  }

  componentDidMount(){
    this.getLists();
  };

  getLists = () => {
    axios.get('http://localhost:3001/lists/')
      .then(
        ({ data }) => {
          console.log( data.lists );
          this.setState({lists : data.lists})
          data.lists.forEach( elm => {
            this.getTasks(elm.listId);
          } )
        })
      .catch(error => console.log(error));
  };

  createList = (name) => {
    axios.put('http://localhost:3001/lists/', {name})
      .then( data => console.log( data ) )
      .then( () => this.getLists() )
      .catch(error => console.log(error));
  };

  updateList = (listId, name) => {
    console.log(name)
    axios.post('http://localhost:3001/lists/' + listId + '/', {name})
      .then( data => console.log( data ) )
      .catch(error => console.log(error));
  };

  deleteList = (listId) => {
    axios.delete('http://localhost:3001/lists/' + listId + '/')
      .then( data => console.log( data ) )
      .then(({data}) => this.setState({lists :  data.lists}))
      .catch(error => console.log(error));
  };

  getTasks = (listId) => {
    axios.get('http://localhost:3001/lists/' + listId + '/tasks/')
      .then( ({data}) => {
          console.log( data );
          const index = this.state.lists.findIndex(list => (list.listId === listId));
          const newState = [ ...this.state.lists ];
          newState[index].tasks = data.tasks;
          this.setState( { lists: newState } );
        })
      .catch(error => console.log(error));
  };

  createTask = (listId, name, description ) => {
    axios.put('http://localhost:3001/lists/' + listId + '/tasks/', {name, description})
      .then( data => console.log( data ) )
      .then( () => this.getLists() )
      .catch(error => console.log(error));
  };

  updateTask = (taskId, name, description) => {
    axios.post('http://localhost:3001/tasks/' + taskId + '/', {name, description})
      .then( data => console.log( data ) )
      .catch(error => console.log(error));
  };

  deleteTask = (taskId) => {
    axios.delete('http://localhost:3001/tasks/' + taskId + '/')
      .then( data => console.log( data ) )
      .catch(error => console.log(error));
  };

  moveTask = (taskId, listId) => {
    axios.post('http://localhost:3001/tasks/' + taskId + '/move/', {listId})
      .then( () => this.getLists() )
      .catch(error => console.log(error));
  };

  listValueChangedHandler = (listId, name) => {
    const index = this.state.lists.findIndex(list => (list.listId === listId));
    const newState = [ ...this.state.lists ];
    newState[index].name = name;
    this.setState( { lists: newState } );
  }

  listUpdateHandler = (listId, event) => {
    const index = this.state.lists.findIndex(list => (list.listId === listId));
    this.updateList(listId, this.state.lists[index].name);
    event.preventDefault();
  }

  listDeleteHandler = (listId) => {
    const index = this.state.lists.findIndex(list => (list.listId === listId));
    const newState = [ ...this.state.lists ];
    newState.splice(index, 1);
    this.setState( { lists: newState } )
    this.deleteList(listId);
  }

  createListSubmitHandler = (event) => {
    this.createList( this.state.newList );
    this.setState({ newList : '' });
    event.preventDefault();
  }

  createListChangeHandler = (name) => {
    this.setState({newList : name})
  }

  taskValueChangeHandler = (value, type, taskId, listId) => {
    const listIndex = this.state.lists.findIndex(list => (list.listId === listId));
    const taskIndex = this.state.lists[listIndex].tasks.findIndex(task => (task.taskId === taskId));
    const newState = [ ...this.state.lists ];
    newState[listIndex].tasks[taskIndex][type] = value;
    this.setState({ lists: newState })
  }

  taskUpdateHandler = (event, taskId, listId) => {
    const listIndex = this.state.lists.findIndex(list => (list.listId === listId));
    const taskIndex = this.state.lists[listIndex].tasks.findIndex(task => (task.taskId === taskId));
    const name = this.state.lists[listIndex].tasks[taskIndex].name;
    const description = this.state.lists[listIndex].tasks[taskIndex].description;
    this.updateTask(taskId, name, description);
    event.preventDefault();
  }

  taskDeleteHandler = (taskId, listId) => {
    const listIndex = this.state.lists.findIndex(list => (list.listId === listId));
    const taskIndex = this.state.lists[listIndex].tasks.findIndex(task => (task.taskId === taskId));
    const newState = [ ...this.state.lists ];
    newState[listIndex].tasks.splice(taskIndex, 1);
    this.setState({ lists: newState })
    this.deleteTask(taskId);
  }

  taskCreateHandler = (event, name, description, listId) => {
    this.createTask(listId, name, description);
    event.preventDefault();
  }

  taskMoveHandler = (event, newListId, taskId) => {

    console.log(newListId)
    this.moveTask(taskId, newListId);
    event.preventDefault();
  }

  render() {
    let lists = null;

    if (this.state.lists) {
      lists = (
        <div className="row">
          {this.state.lists.map(( list, index ) => {
            return (
            <List
              listId={list.listId}
              change={(evt) => {this.listValueChangedHandler(list.listId, evt.target.value)}}
              update={(evt) => this.listUpdateHandler(list.listId, evt)}
              delete={() => this.listDeleteHandler(list.listId)}
              key={list.listId}
              name={list.name}
              tasks={list.tasks}
              taskChange={this.taskValueChangeHandler.bind(this)}
              taskUpdate={this.taskUpdateHandler.bind(this)}
              taskDelete={this.taskDeleteHandler.bind(this)}
              taskCreate={this.taskCreateHandler.bind(this)}
              taskMove={this.taskMoveHandler.bind(this)}
              lists={this.state.lists}
              />
            )
          })}
        </div>
      );
    }

    return (
      <div className="App container">
        <h1>Manage your tasks!</h1>
        <h5>A React App created by Alex</h5>
        <CreateList className="col-4"
            create={(evt) => this.createListSubmitHandler(evt)}
            change={(evt) => this.createListChangeHandler(evt.target.value)}
            value={this.state.newList}
            />
        {lists}
      </div>
    );
  }
}

export default App;


