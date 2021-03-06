import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import {createMemoryHistory, createBrowserHistory} from 'history';


const mount =(el,{onNavigate, defaultHistory}) => {
    const history = defaultHistory || createMemoryHistory();
    if(onNavigate) history.listen(onNavigate(location));

    ReactDOM.render(
        <App history={history} />,
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


if(process.env.NODE_ENV === 'development' && document.querySelector('#marketing-root') ){
    mount(document.querySelector('#marketing-root'),{defaultHistory: createBrowserHistory()})
}

export {mount};