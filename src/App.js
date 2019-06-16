import React from 'react';
import './styles/global.css';

//React Router
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Switch>
        <Route exact path="/" render={ () => <Redirect  to="/courses" />} />
        <Route exact path="/courses" render={() => <Courses />}  />
        <Route exact path="/courses/:id" render={ (props) => <CourseDetail {...props} /> } />
        <Route exact path="/sign-in" render={ () => <UserSignIn /> } />
        <Route exact path="/sign-up" render={ () => <UserSignUp /> } />
        <Route exact path="/create-course" render={ () => <CreateCourse /> } />
        <Route exact path="/courses/:id/update" render={ (props) =><UpdateCourse {...props} /> }/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
