import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';

export default class CreateCourse extends Component {
    state = {
        user: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        err: {},
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e, emailAddress, password, user) => {
        if (e) {
            e.preventDefault();
        }
        // Axios Post Request
        axios({
            method: 'POST',
            url:'http://localhost:5000/api/courses',
            auth:{
                username: emailAddress,
                password: password
            },
            data: {
                user: user._id,
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded
            },
            responseType: 'json'

        })
        .then(() => this.props.history.push('/courses'))
        .catch(err => console.log("Problem Fetching and Parsing Data", err))
    }

        // FETCH API POST REQUEST
        /* 
        fetch('http://localhost:5000/api/courses', {
            method: 'POST',
            credentials: 'same-origin',
            headers: new Headers({ 
                'Authorization': 'Basic ' + btoa(`${emailAddress}:${password}`),
                'Content-Type': 'application/json; charset=UTF-8'
             }),
            body: JSON.stringify({
                emailAddress: emailAddress,
                password: password,
                title: this.state.title,
                description: this.state.description,
                estimatedTime: this.state.estimatedTime,
                materialsNeeded: this.state.materialsNeeded,
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
    } */

    render() {
        return (
            <Consumer>
                {
                    ({ emailAddress, password, user }) => (
                        <div className="bounds course--detail">
                            <h1>Create Course</h1>
                            <div>
                                <div>
                                    <h2 className="validation--errors--label">Validation errors</h2>
                                    <div className="validation-errors">
                                        <ul>
                                            <li>Please provide a value for "Title"</li>
                                            <li>Please provide a value for "Description"</li>
                                        </ul>
                                    </div>
                                </div>
                                <form onSubmit={e => this.handleSubmit(e, emailAddress, password, user)}>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div>
                                                <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleChange} />
                                            </div>
                                            <p>By Joe Smith</p>
                                        </div>
                                        <div className="course--description">
                                            <div>
                                                <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange}></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div>
                                                        <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                                            placeholder="Hours" onChange={this.handleChange} />
                                                    </div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div>
                                                        <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleChange}></textarea>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="grid-100 pad-bottom">
                                        <button className="button" type="submit">Create Course</button>
                                        <button className="button button-secondary">
                                            <Link to="/">Cancel</Link>
                                        </button></div>
                                </form>
                            </div>
                        </div>
                    )
                }


            </Consumer>

        );
    }
}