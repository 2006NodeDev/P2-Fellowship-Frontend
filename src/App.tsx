import React, { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { User } from './models/User';
import { LoginComponent } from './components/LoginComponent';
import { NavBarComponent } from './components/NavBarComponent';
import { HomeComponent } from './components/HomeComponent';
import { LOTRLocationProfileComponent } from './components/LOTRLocationProfileComponent'
import {BrowserRouter as Router, Route} from "react-router-dom";
import { UserProfileComponent } from './components/UserProfileComponent';
import {ToastContainer} from 'react-toastify'
import { NewUserComponent } from './components/NewUserComponent';
import { UpdateUserProfileComponent } from './components/UpdateUserProfileComponent';
import { LogOutComponent } from './components/LogOutComponent';
import { AllUsersComponent } from './components/AllUsersComponent';
import { AllLocationsComponent } from './components/AllLocationsComponent';
import { NewLocationComponent } from './components/NewLocationComponent';

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)

  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        {/*Route path='/users' component={AllUsersComponent}/> */}
        <Route path='/home' component={HomeComponent}/>
        {/*Figure out how to make this the start up screen */}
        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/register' render={(props)=>(<NewUserComponent changeCurrentUser={changeCurrentUser} {...props} />)}/>
        <Route path='/logout' render={(props)=>(<LogOutComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>

        <Route path='/user/profile/:userId' component={UserProfileComponent}/>
        <Route path='/user/update/:userId' render={(props)=>(<UpdateUserProfileComponent user={currentUser} {...props}/>)}/>
        <Route path = '/users/newuser' render={(props)=>(<NewUserComponent {...props}/>)} />
        <Route exact path='/users' component={AllUsersComponent}/>
        
        <Route path='/locations/:locationId' component={LOTRLocationProfileComponent}/>
        <Route path = '/locations/newlocation' render={(props)=>(<NewLocationComponent {...props}/>)} />
        <Route exact path='/locations' component={AllLocationsComponent}/>

        <br/>
      </Router>
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
