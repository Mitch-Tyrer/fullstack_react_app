import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {
    state = {
        courses: []
    }

    componentDidMount () {
        axios({
            method: 'GET',
            url: "http://localhost:5000/api/courses/"
        }).then( res => {
            this.setState({ courses: res.data});
        })
        .catch(err => {
            if(err.response.status === 400){
                this.props.history.push('/notfound');
                console.log("Error Parsing and Fetching Data", err)
            } else if (err.response.status === 500) {
                this.props.history.push('/error');
                console.log("Error Parsing and Fetching Data", err)
            }
        })
    }

/*     componentDidMount() {
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(resData => this.setState({ courses: resData }))
            .catch(err => {
                if(err.response.status === 400){
                    this.props.history.push('/notfound');
                    console.log("Error Parsing and Fetching Data", err)
                } else if (err.response.status === 500) {
                    this.props.history.push('/error');
                    console.log("Error Parsing and Fetching Data", err)
                }
            })
    }
 */
    render() {
        return (
            <div className="bounds">
                {
                    this.state.courses.map(course =>
                        <div className="grid-33" key={course._id} >
                            <Link className="course--module course--link" to={`/courses/${course._id}`}>
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                            </Link>
                        </div>
                    )
                }
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="create-course">
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </Link>
                </div>
            </div>
        );
    }
}