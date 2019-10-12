import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    boards : []
  }

  componentDidMount(){
    this.getBoards();
  };

  getBoards = _ => {
    fetch('http://localhost:3001')
      .then( response => console.log( response ) )
      .then(({response}) => this.setState({boards :  'response.boards'}))
      .catch(error => console.log(error));
  };

  showBoards = board => <div key={board.id}>{board.name}</div>

  // deletePersonHandler = (personIndex) => {
  //   const persons = [ ...this.state.persons ];
  //   persons.splice(personIndex, 1)
  //   this.setState({persons: persons})
  // }

  // nameChangedHandler = (event) => {
  //   this.setState({persons : [
  //     { name : 'Kate Wood', age : 24 },
  //     { name : event.target.value, age : 26 },
  //     { name : 'Meee', age : 25 }
  //   ]})
  // }

  // togglePersonsHandler = () => {
  //   const doesShow = this.state.showPersons;
  //   this.setState({showPersons: !doesShow})
  // }

  render() {
    const { boards } = this.state;
    return (
      <div className="App">
        <h1>Hi I am a react app</h1>
        <p>this is really working</p>
        {boards.map(this.showBoards)}
      </div>
    );
  }
}

export default App;


