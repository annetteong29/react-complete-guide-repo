import React, {Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.module.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

// const person = (props) => { & no render()
class Person extends Component {
    // method 2:
    constructor(props) {
        super(props); // always call super when making constructor
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext; 
    
    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render () {
        console.log('[Person.js] rendering...');

        return(
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in.</p>}
                {/* {this.props.isAuth ? <p>Authenticated!</p> : <p>Please log in.</p>} */}
                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                    </p>
                <p>{this.props.children}</p>
                <input 
                    /* this.inputElement is created as a global property
                    that can be used anywhere from now on */
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name} />
            </Aux>
        );
    }
}

// special property you add to any JS component object that 
// React will watch out for in development mode and warn you
// if you pass in incorrect props
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);