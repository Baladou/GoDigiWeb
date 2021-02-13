import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from "../pages/ach_Header";
import Footer from "../pages/ach_Footer";


import Accueil from "../pages/Accueil";
import Profile from "../pages/Profile"

import Chatroom from "../pages/Chatroom";
import CreerChatroom from "../pages/CreerChatroom";

import Regles from "../pages/ach_Regles";
import Description from "../pages/Description";

import ModifierProfile from "../pages/ModifierProfile";

import login from '../pages/auth/Login' 
import register from '../pages/auth/SignUp'
import changePassword from "../pages/auth/changePassword"; 
import changePasswordLink from "../pages/auth/changePasswordLink"; 





class Container extends Component {

    render() {
        return (
          <div>
            <Header />
            <BrowserRouter>
              <Route exact path="/CreerChatroom" component={CreerChatroom} />

              <Route exact path="/Chatroom" component={Chatroom} />

              <Route exact path="/login" component={login} />
              <Route exact path="/register" component={register} />
              <Route exact path="/changePassword" component={changePassword} />
              <Route
                exact
                path="/changePasswordLink"
                component={changePasswordLink}
              />
              <Route exact path="/" component={Accueil} />
              <Route exact path="/Accueil" component={Accueil} />
              <Route exact path="/Profile" component={Profile} />

              <Route exact path="/Regles" component={Regles} />
              <Route exact path="/Description" component={Description} />
              

              <Route
                exact
                path="/ModifierProfile"
                component={ModifierProfile}
              />
            </BrowserRouter>
            <Footer />
          </div>
        );
    }
}

export default Container;