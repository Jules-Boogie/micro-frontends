import React from "react";
import { BrowserRouter } from "react-router-dom";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { StylesProvider, createGenerateClassName} from '@material-ui/styles';

export default () => {
    const generateClassName = createGenerateClassName({
        productionPrefix:'co'
    })
    
  return(
<BrowserRouter>
    <StylesProvider generateClassName={generateClassName}>
    <Header />
      <MarketingApp />
    </StylesProvider>
  </BrowserRouter>
  )
  
};
