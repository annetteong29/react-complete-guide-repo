import React, {Component} from 'react';
import Person from './Person/Person';

// functional (not class-based) component 
// for stateless/presentational

// props will contain array of Person.s that we transform to JSX
// const persons =  (props) => { & no render()
class Persons extends Component {

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }
    //
    // warning msg:
    // if use, should define initial state by assigning object
    // to this.state in constructor of Persons, to ensure
    // getDerivedStateFromProps args have consistent shape
    // 
    // since Persons doesn't use a constructor, 
    // doesn't make sense to include this

    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps');
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot!'};
    }

    // componentWillUpdate() {
    //     console.log('[Persons.js] componentWillUpdate');
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    render() {
        console.log('[Persons.js] rendering...');

        return ( this.props.persons.map((person, index) => {
            return <Person 
                click={() => this.props.clicked(index)}
                name={person.name} 
                age={person.age}  
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)} 
            />
        }))
    }
}

export default Persons;