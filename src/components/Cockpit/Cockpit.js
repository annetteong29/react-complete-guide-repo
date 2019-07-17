import React from 'react';
import classes from './Cockpit.module.css';

// functional component
const cockpit = (props) => {

    const assignedClasses = []; // result: 'red bold'
    let btnClass = '';
    
    if (props.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }
    if (props.showPersons) {
        btnClass = classes.red;
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass}
            onClick={props.toggle}>Toggle Persons</button>
        </div>
    );
};

export default cockpit;