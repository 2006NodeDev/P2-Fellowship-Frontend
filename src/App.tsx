import React, { useState } from 'react';
import './App.css';
//import './components/User-Profile-Component/node_modules/react-toastify/dist/ReactToastify.css';
import { User } from './models/User';
import { LoginComponent } from './components/Login-Component/LoginComponent';
import { NavBarComponent } from './components/Nav-Bar-Component/NavBarComponent';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { FullUserDisplayComponent } from './components/User-Display-Components/FullUserDisplayComponent';
import {ToastContainer} from 'react-toastify'
import { NewUserComponent } from './components/New-User-Component/NewUserComponent';
import { LogOutComponent } from './components/Logout-Component/LogOutComponent';
import { AllUsersComponent } from './components/All-Users-Component/AllUsersComponent';
import { AllLocationsComponent } from './components/All-Locations-Component/AllLocationsComponent';
import { Provider } from 'react-redux';
import { store } from './store';
import { LocationProfileComponent } from '../src/components/Location-Profile-Component/LocationProfileComponent';
import { HomeComponent } from './components/Home-Page-Component/HomeComponent';
import { UserProfileComponent } from './components/User-Profile-Component/UserProfileComponent';
import { UpdateUserProfileComponent } from './components/Update-User-Components/AdminUpdateUserComponent';
import { TitleComponent } from './components/Title-Component/TitleComponent';
import SimpleMap from './components/MapComponent/simpleMap';

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)

  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <NavBarComponent user={currentUser}/>
        <Route exact path='/' component={HomeComponent}/>
        {/*Figure out how to make this the start up screen */}

        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props} />)} />
        <Route path='/logout' render={(props)=>(<LogOutComponent changeCurrentUser={changeCurrentUser} {...props}/>)}/>
        <Route path='/register' component={NewUserComponent}/>

        <Route exact path='/users/profile/:userId' component={UserProfileComponent}/>
        <Route exact path='/users' component={AllUsersComponent}/>
        <Route exact path='/users/profile/:userId/update' component={UpdateUserProfileComponent}/>


        <Route path='/locations/profile/:locationId' component={LocationProfileComponent}/>
        <Route exact path='/locations' component={AllLocationsComponent}/>
        <Route exact path='/map' component={SimpleMap}/>

        <br/>
      </Router>
      </Provider>
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
