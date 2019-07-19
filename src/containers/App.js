import React, { Component } from 'react';
import classes from './App.module.css';
// import Person from '../components/Persons/Person/Person';
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

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
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
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

  // internally checks if DOM needs to be updated
  // using virtual DOM
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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

    this.setState((prevState, props) => {
      // just setting changeCounter: this.state.changeCounter+1
      // without using function
      // does not guarantee 100% accuracy (relies on old value)
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1 
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1); // removes 1 element from array at personIndex
    this.setState({
      persons: persons
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  loginHandler = () => {
    this.setState({authenticated: true})
  };

  render() {
    console.log('[App.js] render');

    let persons = null; // default

    // adjust with if-statements to return conditionally
    if ( this.state.showPersons ) {
      persons =  (
          <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler} 
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}/>
      )
    }

    return (
      <Aux>
        <button onClick={() => {
          this.setState({showCockpit: false})
        }}>Remove Cockpit</button>
        <AuthContext.Provider value={{
            authenticated: this.state.authenticated, 
            login: this.loginHandler}}>
          {this.state.showCockpit ? (
            <Cockpit 
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              toggle={this.togglePersonsHandler}
          /> ): null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.createElement('div', {className:'App'}, React.createElement('h1',null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);

