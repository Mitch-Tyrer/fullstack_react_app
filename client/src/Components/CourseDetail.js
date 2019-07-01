import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Consumer } from './Context';

export default class CourseDetail extends Component {
    state = {
        course: [],
        user: []
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/courses/" + this.props.match.params.id)
            .then(res => res.json())
            .then(resData =>{
                this.setState({ course: resData, user: resData.user })
            } )
            .catch(err => console.log('Error fetching and parsing data', err))
    }

    render() {
        const course = this.state.course
        const courseUser = this.state.user
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <Consumer>
                                {
                                    ({ user, isLoggedIn }) => (
                                        isLoggedIn && (user._id === courseUser._id )? (
                                            <span>
                                                <Link className="button" to={`/courses/${course._id}/update`}>Update Course</Link>
                                                <Link className="button" to="#">Delete Course</Link>
                                            </span>
                                        ) : (<span></span>)
                                )}
                            </Consumer>
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {courseUser.firstName} {courseUser.lastName} </p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={course.description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        <ReactMarkdown source={course.materialsNeeded} />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}