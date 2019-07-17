import React, { PureComponent } from 'react';
import Person from './Person/Person';

// functional (not class-based) component 
// for stateless/presentational

// props will contain array of Person.s that we transform to JSX
// const persons =  (props) => { & no render()
class Persons extends PureComponent {

    // to check ALL props being checked for a component
        // (in this case, for Person component, 
        // this.props.persons, this.props.clicked, this.props.changed)

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.persons !== this.props.persons) {
    //         return true;
    //     } else
    //     return false;
    // }

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