import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Switch, Redirect, Router } from "react-router-dom";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";
import {createBrowserHistory} from 'history';

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(()=> import('./components/DashboardApp'));
const generateClassName = createGenerateClassName({
    productionPrefix: "co",
  });

export default () => {
    const history = createBrowserHistory()
    const [isSignedIn, setIsSignedIn] = useState(false);
useEffect(()=>{
    if(isSignedIn){
        history.push('/dashboard')
    }
},[isSignedIn])

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/dashboard">
                    {!isSignedIn && <Redirect to="/" />}
                    <DashboardLazy />
                    </Route> 
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
