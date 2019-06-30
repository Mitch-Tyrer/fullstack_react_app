import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';

const Header = () => {
    return (
        <Consumer>
            {({ user, signOut, isLoggedIn }) => (
                 (isLoggedIn) ? (
                    <div className="header">
                        <div className="bounds">
                            <h1 className="header--logo">Courses</h1>
                            <nav>
                                <span>Welcome { `${user.user.firstName} ${user.user.lastName}` }!</span>
                                <Link className="signin" to="/sign-out" onClick={signOut} >Sign Out</Link>
                            </nav>
                        </div>
                    </div>
                ) : (
                        <div className="header">
                            <div className="bounds">
                                <h1 className="header--logo">Courses</h1>
                                <nav>
                                    <Link className="signup" to="/sign-up">Sign Up</Link>
                                    <Link className="signin" to="/sign-in">Sign In</Link>
                                </nav>
                            </div>
                        </div>
                    )
            )}
        </Consumer>

    );
}

export default Header;