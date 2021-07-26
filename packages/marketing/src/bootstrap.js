import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";

const mount =(el) => {
    ReactDOM.render(
        <App />,
        el
    )
}

if(process.env.NODE_ENV === 'development' && document.querySelector('#marketing-root') ){
    mount(document.querySelector('#marketing-root'))
}

export {mount};