import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { User } from '../models/User';
import {createNewUser} from '../remote/createNewUser'
import { useDispatch } from 'react-redux';
import { newuserActionMapper } from '../action-mappers/new-user-action-mapper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);


export const NewUserComponent:FunctionComponent<any> = ((props) => {
    const classes = useStyles();

    

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstname, changeFirstName] = useState('')
    const [lastname, changeLastName] = useState('')
    const [affiliation, changeAffiliation] = useState('')
    const [placesVisited, changePlacesVisited] = useState(0)
    const [address, changeAddress] = useState('')
    const [email, changeEmail] = useState('')
    const [role, changeRole] = useState('')
    const [image, changeImage] = useState<any>(null)

  const updateUsername = (event:any) => {
      event.preventDefault()
      changeUsername(event.currentTarget.value)
  }
  const updatePassword = (event : any) => {
      event.preventDefault()
      changePassword(event.currentTarget.value)
  }
  const updateFirstName = (event:any) => {
      event.preventDefault()
      changeFirstName(event.currentTarget.value)
  }
  const updateLastName = (event:any) => {
      event.preventDefault()
      changeLastName(event.currentTarget.value)
  }
  const updateAffiliation = (event:any) => {
    event.preventDefault()
    changeAffiliation(event.currentTarget.value)
}
const updatePlacesVisited = (event:any) => {
    event.preventDefault()
    changePlacesVisited(event.currentTarget.value)
}
const updateAddress = (event:any) => {
  event.preventDefault()
  changeAddress(event.currentTarget.value)
}
const updateEmail = (event:any) => {
    event.preventDefault()
    changeEmail(event.currentTarget.value)
}
const updateRole = (event:any) => {
    event.preventDefault()
    changeRole(event.currentTarget.value)
}
const updateImage = (event:any) => {
    let file:File = event.currentTarget.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      changeImage(reader.result)
    }
}

const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  changeRole(event.target.value as string);
};



    
    //Plain React w/o Redux:
    // const newUserSubmit = async (e:SyntheticEvent) => {
    //   e.preventDefault()
      
    //     let res = await createNewUser(username, password, firstname, lastname, affiliation, placesVisited, address, email, role, image)
    //     console.log("new user submit response in compontn" + res)
        
    //     props.changeNewUser(res)
    //     props.history.push(`/profile/${res.userId}`) 
        
    // }


    //with Redux:

    const dispatch = useDispatch()
    
    const newUserSubmit = async (e:SyntheticEvent) => {
      e.preventDefault()

        //new usr doesnt need a role because they default to "User"
        let thunk = newuserActionMapper(username, password, firstname, lastname, affiliation, placesVisited, address, email, image)
        dispatch(thunk) 
    }

//Note: placesVisited starts at 0 by default so 
//User is not required to fill in this field of the form below.

  return (
    <form className={classes.root} autoComplete="off" onSubmit={newUserSubmit}>
      <div>
      <br />

      <TextField
          required id="standard-required"
          label="Username"
          autoComplete="off"
          value ={username} 
          onChange = {updateUsername}
        />
        <br />
        <TextField
          required id="standard-required"
          label="Password"
          autoComplete="off"
          type="password"
          value ={password} 
          onChange = {updatePassword}
          
        />
        <br />
        <TextField
          id="standard-password-input"
          label="First Name"
          autoComplete="off"
          value ={firstname} 
          onChange = {updateFirstName}
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Last Name"
          autoComplete="off"
          value ={lastname} 
          onChange = {updateLastName}

        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Affiliation"
          autoComplete="off"
          multiline
          value ={affiliation} 
          onChange = {updateAffiliation}

        />

        <br/>
        <TextField
          id="standard-password-input"
          label="Address"
          autoComplete="off"
          value ={address} 
          onChange = {updateAddress}

        />
        <br/>
        <TextField
          id="standard-password-input"
          label="Email"
          type="email"
          autoComplete="off"
          value ={email} 
          onChange = {updateEmail}

        />
        <br />
        
              <FormControl required className={classes.formControl}>
                    <InputLabel id="role">Role</InputLabel>
                    <Select
                      labelId="role"
                      id="role"
                      value={role}
                      onChange={handleChange}
                      className={classes.selectEmpty}
                    >
                    <MenuItem value={"User"}>User</MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>
                    
                </FormControl>
              
        <br />
        <br />
        <label htmlFor='file'>
          Profile Picture
        </label>
        <hr />
        <input type='file' name='file' accept='image/*' onChange={updateImage}></input>
        
        <br/>
        <br />
        <img src={image?image:''} width="150" height="200"/>
        <hr />
        
        <Button type = 'submit' variant = 'contained' color = 'primary' onClick={newUserSubmit}> Submit </Button>

      </div>
    </form>
  )


})