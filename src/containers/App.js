import React, { Component } from 'react';
import classes from './App.module.css';
// import Person from '../components/Persons/Person/Person';
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    // executes constructor of component you're extending
    // ensures you can access this.setState
    super(props);

    console.log('[App.js] constructor');

    // also possible to do this.state here instead of state outside constructor,
    // which is more modern syntax which does constructor, super, 
    // and this.state for you
  }

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
  

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
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
    console.log('[App.js] render');

    let persons = null; // default

    // adjust with if-statements to return conditionally
    if ( this.state.showPersons ) {
      persons =  (
          <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler} 
            changed={this.nameChangedHandler}/>
      )
    }

    return (
      <div className={classes.App}>
      <Cockpit 
        title={this.props.appTitle}
        persons={this.state.persons}
        showPersons={this.state.showPersons}
        toggle={this.togglePersonsHandler}
        />
      {persons}
      </div>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1',null, 'Does this work now?'));
  }
}

export default App;

