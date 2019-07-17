import React from 'react';
import Person from './Person/Person';

// functional (not class-based) component 
// for stateless/presentational

// props will contain array of Person.s that we transform to JSX
const persons =  (props) => {
    console.log('[Persons.js] rendering...');
    return ( props.persons.map((person, index) => {
        return <Person 
            click={() => props.clicked(index)}
            name={person.name} 
            age={person.age}  
            key={person.id}
            changed={(event) => props.changed(event, person.id)} 
            />
    })
)};

export default persons;