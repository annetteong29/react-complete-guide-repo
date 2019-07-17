import React, { useEffect } from 'react';
import classes from './Cockpit.module.css';

// functional component
const Cockpit = (props) => {
    // no need getDerivedStateFromProps because 
    // can use useState() to base the state on props
    // (has props since functional component)

    // runs for every update
    useEffect(() => { 
        console.log('[Cockpit.js] useEffect'); 
        // HTTP request can be sent here...
        // const timer = 
        // setTimeout( () => {
        //     alert('Saved data to cloud!');
        // }, 1000 );
        // runs only when component unmounts, because of empty array in second param
        return () => {
            // eg of cleanup work in useEffect
            // if cockpit not removed within set duration,
            // timer will be cleared and no alert
            // clearTimeout(timer); 
            console.log('[Cockpit.js] cleanup work in useEffect')
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect'); 
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect')
        };
    })

    const assignedClasses = []; // result: 'red bold'
    let btnClass = '';
    
    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
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

export default React.memo(Cockpit);