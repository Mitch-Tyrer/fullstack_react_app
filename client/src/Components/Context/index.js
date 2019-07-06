import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = React.createContext();

export const Consumer = UserContext.Consumer;


class Provider extends Component {
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        user: {},
        emailAddress: '',
        password: '',
        isLoggedIn: false

    }

    handleSignIn = (e, emailAddress, password) => {
        if (e) {
            e.preventDefault();
        }
//      Axios fetch request
        axios.get('http://localhost:5000/api/users', {
            auth:{
                username: emailAddress,
                password: password
            }
        })
        .then(res => {
            if(res.status === 200){
                let user = res.data;
                this.setState({
                    user: user,
                    emailAddress: user.emailAddress,
                    password: user.password,
                    isLoggedIn: true
                });
                Cookies.set('authenticatedUser', JSON.stringify(this.state.user))
                window.localStorage.setItem("emailAddress", emailAddress);
                window.localStorage.setItem("password", password);

                this.props.history.push('/courses');
            }
        }).catch(err => {
            if(err.response.status === 400){
                this.props.history.push('/notfound');
                console.log("Error Parsing and Fetching Data", err)
            } else if (err.response.status === 500) {
                this.props.history.push('/error');
                console.log("Error Parsing and Fetching Data", err)
            }
        })


//      FETCH API VERSION OF LOGIN
/* 
        fetch('http://localhost:5000/api/users', {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`),
                'Content-Type': 'application/json',
            }),
            credentials: 'same-origin'
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
 */
    }
    handleSignOut = () => {
        window.localStorage.clear();
        this.setState({
            user: {},
            emailAddress: '',
            password: '',
            isLoggedIn: false
        });
        Cookies.remove('authenticatedUser');

        this.props.history.push('/courses');
 }

render() {
    const { authenticatedUser } = this.state;
    return (
        <UserContext.Provider value={
            {
                authenticatedUser,
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
