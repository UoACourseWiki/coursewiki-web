import React, {Fragment, useState} from "react";
import SearchAppBar from './header';
import Home from './home';
import Search from './search';
import Course from './course';
import User from './user';
import {makeStyles} from '@material-ui/core/styles';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./login";
import Join from "./join";
import PasswordReset from "./password_reset";
import EmailValidate from "./emailvalidate";
import Reset from "./reset";

const useStyles = makeStyles((theme) => ({
    notFound: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)"
    }
}));

export default function App() {
    const classes = useStyles();

    const [message, setMessage] = useState(true);

    function saveLogin() {
        var query = new URLSearchParams(window.location.search);
        var token = query.get("token");
        if (token && token.length > 0) localStorage.setItem("token", token);
        setMessage(false);
        window.location.href = "/";
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login">
                        {/*<Snackbar open={message} autoHideDuration={1000} onClose={ saveLogin }>*/}
                        {/*    <MuiAlert elevation={6} variant="filled" severity="success">SuccessFully Logged In</MuiAlert>*/}
                        {/*</Snackbar>*/}
                        <Login/>
                    </Route>
                    <Route path="/password_reset">
                        <PasswordReset/>
                    </Route>
                    <Route path="/email_validate">
                        <EmailValidate/>
                    </Route>
                    <Route path="/reset">
                        <Reset/>
                    </Route>
                    <Fragment>
                        <SearchAppBar/>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/join">
                            <Join/>
                        </Route>
                        <Route path="/search/:query">
                            <Search/>
                        </Route>
                        <Route path="/course/:query">
                            <Course/>
                        </Route>
                        <Route path="/user/:query">
                            <User/>
                        </Route>
                        <Route path="/user/me">
                            <User/>
                        </Route>
                    </Fragment>
                    <Route>
                        <img src="/404.gif" className={classes.notFound}/>
                    </Route>

                </Switch>
            </Router>
        </div>

    );
}