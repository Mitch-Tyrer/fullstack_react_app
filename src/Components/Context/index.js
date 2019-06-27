import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const UserContext = React.createContext();

export const Consumer = UserContext.Consumer;

class Provider extends Component {
    state = {
        username: '',
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
                        username: data.emailAddress,
                        password: data.password,
                        isLoggedIn: true
                    });
                    window.localStorage.setItem("username", emailAddress);
                    window.localStorage.setItem("password", password);

                    this.props.history.push('/courses');
                })
            } else {
                this.props.history.push('/error')
            }
        }).catch( err => console.log("Problem Fetching and Parsing Data", err))
    }

    handleSignOut = () => {
        this.setState({
            username: '',
            password: '',
            isLoggedIn: false
        })
}

render() {
    return (
        <UserContext.Provider value={
            {
                username: this.state.username,
                password: this.state.password,
                isLoggedIn: this.state.isLoggedIn,
                signIn: this.handleSignIn
            }
        }>

            {this.props.children}

        </UserContext.Provider>
    );
}
}

export default withRouter(Provider);
