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

    // if return true, whenever re-rendered, will update
    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        // prevents re-rendering:
        // both Persons and Cockpit are children of App
        // even if only Cockpit is updated, everything will be re-rendered
        // so check (before re-rendering) if values are same
        // if they are same, return false i.e. no need to update
        //
        // * works when nextProps.persons POINTS to object
        // if not duplicated eg. using spread (in nameChangedHandler),
        // will not work because both will be pointing to same object in memory
        if (nextProps.persons !== this.props.persons) {
            return true;
        } else
        return false;

        // to check ALL props being checked for a component, use PureComponent
        // (in this case, for Person component, 
        // this.props.persons, this.props.clicked, this.props.changed)
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

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
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