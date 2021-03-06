import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  state = {
    // persons is an array of objects. Removes hard coding in render.
    persons: [
      { id: 'sasdfr', name: 'Max', age: 28 },
      { id: '2g34df', name: 'Manu', age: 29 },
      { id: '23tgre', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value', 
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex] // without spread, would change original instead
    };

    // alternative: create new Object
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1); // removes 1 element from array at personIndex
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    // dynamic stuff before return

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen', 
        color: 'black'
      }
    };

    let persons = null; // default

    // adjust with if-statements to return conditionally
    if ( this.state.showPersons ) {
      persons =  (
        // use .map() to convert to JSX. Returns element and index for each element
        // use key so React can efficiently update everything
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              key={person.id} 
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      )

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon', 
        color: 'black'
      }
    }

    const classes = []; // result: 'red bold'
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1',null, 'Does this work now?'));
  }
}

// Radium is a higher-order component, injecting extra functionality
export default Radium(App);