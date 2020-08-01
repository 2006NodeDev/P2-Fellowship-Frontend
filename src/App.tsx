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
//import { NewUserComponent } from './components/NewUserComponent';
//import { UpdateUserProfileComponent } from './components/UpdateUserProfileComponent';
import { LogOutComponent } from './components/LogOutComponent';
import { AllUsersComponent } from './components/AllUsersComponent';
import { AllLocationsComponent } from './components/AllLocationsComponent';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)

  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <NavBarComponent user={currentUser}/>
        {/*Route path='/users' component={AllUsersComponent}/> */}
        <Route path='/home' component={HomeComponent}/>
        {/*Figure out how to make this the start up screen */}
        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/logout' render={(props)=>(<LogOutComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>

        <Route path='/user/profile/:userId' component={UserProfileComponent}/>
        <Route exact path='/users' component={AllUsersComponent}/>
        
        <Route path='/locations/:locationId' component={LOTRLocationProfileComponent}/>
        <Route exact path='/locations' component={AllLocationsComponent}/>

        <br/>
      </Router>
      </Provider>
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
