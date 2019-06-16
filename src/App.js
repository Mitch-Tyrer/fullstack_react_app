import React from 'react';
import './styles/global.css';

//React Router
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//Components
import Header from './Components/Header';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Switch>
        <Route exact path="/" render={ () => <Redirect  to="/courses" />} />
        <Route exact path="/courses" render={() => <Courses />}  />
        <Route exact path="/courses/:id" render={ (props) => <CourseDetail {...props} /> } />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
