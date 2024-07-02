import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BoardSetting from "../pages/BoardSettings"
import ProtectedRoute from "./ProtectedRoute";
import Board from "../pages/Board";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/home";
import CardInfo from "../components/CardInfo/CardInfo";
export default function Routes() {
    const user = sessionStorage.getItem("user");

    return (
        <Switch>

            <Route exact path='/' render={() => <Home />} />
            <Route exact path="/signup" render={(routeProps) => <Signup routeProps={routeProps} />} />
            <Route exact path="/login" render={(routeProps) => <Login routeProps={routeProps} />} />
                <Route exact path="/dashboard" render={() => <Dashboard />} />
                <ProtectedRoute exact path="/board/:id" component={Board} loggedIn={user} />
                <ProtectedRoute exact path="/board-settings" component={BoardSetting} loggedIn={user} />
                <ProtectedRoute exact path="/card-info/:id" component={CardInfo} loggedIn={user}/>
            <Redirect to="/" />

        </Switch>
    );
}