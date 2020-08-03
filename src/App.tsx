import React, { useState } from 'react';
import './App.css';
//import './components/User-Profile-Component/node_modules/react-toastify/dist/ReactToastify.css';
import { User } from './models/User';
import { LoginComponent } from './components/Login-Component/LoginComponent';
import { NavBarComponent } from './components/Nav-Bar-Component/NavBarComponent';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { UserProfileComponent } from './components/User-Display-Components/FullUserDisplayComponent';
import {ToastContainer} from 'react-toastify'
import { NewUserComponent } from './components/New-User-Component/NewUserComponent';
import { LogOutComponent } from './components/Logout-Component/LogOutComponent';
import { AllUsersComponent } from './components/All-Users-Components/AllUsersComponent';
import { AllLocationsComponent } from './components/All-Locations-Component/AllLocationsComponent';
import { Provider } from 'react-redux';
import { store } from './store';
import { LocationProfileComponent } from './components/Location-Display-Components/FullLocationDisplayComponent';
import { HomeComponent } from './components/Home-Page-Component/HomeComponent';

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)

  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route exact path='/' component={HomeComponent}/>
        {/*Figure out how to make this the start up screen */}

        <Route path='/users' component={AllUsersComponent}/>

        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/logout' render={(props)=>(<LogOutComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>
        <Route path='/register' component={NewUserComponent}/>

        <Route path='/users/profile/:userId' component={UserProfileComponent}/>
        <Route exact path='/users' component={AllUsersComponent}/>
        <Route path = '/users/newuser' render={(props)=>(<NewUserComponent {...props}/>)} />

        <Route path='/locations/profile/:locationId' component={LocationProfileComponent}/>
        <Route exact path='/locations' component={AllLocationsComponent}/>

        <br/>
      </Router>
      </Provider>
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
