import React,{lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import {createMemoryHistory, createBrowserHistory} from 'history';


const mount =(el,{onSignIn, onNavigate, defaultHistory, initialPath}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries:[initialPath]
    });
    if(onNavigate) history.listen(onNavigate(location));

    ReactDOM.render(
        <App onSignIn={onSignIn} history={history} />,
        el
    )
    return {
        onParentNavigate({pathname: nextPathname}){
            const {pathname} = history.location
            if(pathname !=nextPathname ){
                history.push(nextPathname)
            }
        }
    }
};


if(process.env.NODE_ENV === 'development' && document.querySelector('#auth-dev-root') ){
    mount(document.querySelector('#auth-dev-root'),{defaultHistory: createBrowserHistory()})
}

export {mount};