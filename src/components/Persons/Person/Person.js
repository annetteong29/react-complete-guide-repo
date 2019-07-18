import React, {Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.module.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';

// const person = (props) => { & no render()
class Person extends Component {
    render () {
        console.log('[Person.js] rendering...');

        return(
            <Aux>
                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                    </p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
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