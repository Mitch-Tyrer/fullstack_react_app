import React, { Component } from 'react';
import './styles/global.css';

//React Router
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

//Context API

//Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import PrivateRoute from './Components/PrivateRoute';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import Error from './Components/Error';

class App extends Component {


  render() {

    return (
        <>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/courses" />} />
            <Route exact path="/courses" render={() => <Courses />} />
            <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
            <Route exact path="/sign-in" render={(props) => <UserSignIn {...props} />} />
            <Route exact path="/sign-up" render={() => <UserSignUp />} />
            <Route exact path="/sign-out" render={() => <Redirect to="/courses" />} />
            <PrivateRoute exact path="/create-course" component={CreateCourse} />
            <PrivateRoute exact path="/courses/:id/update" render={(props) => <UpdateCourse {...props} />} />} />
            <Route exact path="/notfound" component={NotFound} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/error" component={Error} />
          </Switch>
        </>
    );
  }
}

export default withRouter(App);
