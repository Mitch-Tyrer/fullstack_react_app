import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const UserContext = React.createContext();

export const Consumer = UserContext.Consumer;

class Provider extends Component {
    state = {
        user: {},
        emailAddress: '',
        password: '',
        isLoggedIn: false

    }

    handleSignIn = (e, emailAddress, password) => {
        if (e) {
            e.preventDefault();
        }

        fetch('http://localhost:5000/api/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`),
                'Content-Type': 'application/json'
            }
        }).then( res => {
            if(res.status === 200) {
                res.json().then(data => {
                    this.setState({
                        user: {data},
                        emailAddress: data.emailAddress,
                        password: data.password,
                        isLoggedIn: true
                    });
                    window.localStorage.setItem("emailAddress", emailAddress);
                    window.localStorage.setItem("password", password);

                    this.props.history.push('/courses');

                })
            } else {
                this.props.history.push('/error')
            }
        }).catch( err => console.log("Problem Fetching and Parsing Data", err))
    }

    handleSignOut = () => {
        window.localStorage.clear();

        this.setState({
            user: {},
            emailAddress: '',
            password: '',
            isLoggedIn: false
        });

        this.props.history.push('/courses');
 }

render() {
    return (
        <UserContext.Provider value={
            {
                user: this.state.user,
                emailAddress: this.state.emailAddress,
                password: this.state.password,
                isLoggedIn: this.state.isLoggedIn,
                signIn: this.handleSignIn,
                signOut: this.handleSignOut
            }
        }>

            {this.props.children}

        </UserContext.Provider>
    );
}
}

export default withRouter(Provider);
