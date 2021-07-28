import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
  const generateClassName = createGenerateClassName({
    productionPrefix: "co",
  });
  const MarketingLazy = lazy(() => import("./components/MarketingApp"));
  const AuthLazy = lazy(() => import("./components/AuthApp"));

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                </Route>
            <Route path="/" component={MarketingLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
