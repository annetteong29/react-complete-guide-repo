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


    // only selects first component of 'input' type in entire page
    // not great because it doesn't refer to input rendered by Person
    // if it did, it would render the last input
    // this is because it's not related to React, and so doesn't care about React,
    // but is a general web/browser feature i.e. DOM selector
    // and always works on entire DOM
    
    componentDidMount() {
    // document.querySelector('input').focus();
        // method 1:
        // this.inputElement.focus();
        // method 2:
        this.inputElementRef.current.focus();
    }

    render () {
        console.log('[Person.js] rendering...');

        return(
            <Aux>
                <AuthContext.Consumer>
                    {(context) => 
                        context.authenticated ? <p>Authenticated!</p> : <p>Please log in.</p>
                    }
                </AuthContext.Consumer>
                {/* {this.props.isAuth ? <p>Authenticated!</p> : <p>Please log in.</p>} */}
                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!
                    </p>
                <p>{this.props.children}</p>
                <input 
                    /* this.inputElement is created as a global property
                    that can be used anywhere from now on */
                    // method 1:
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    // method 2:
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