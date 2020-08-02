import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Location } from '../models/Location'
import {createNewLocation} from '../remote/createNewLocation'
import { newLocationActionMapper } from '../action-mappers/new-location-action-mapper';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);


export const NewLocationComponent:FunctionComponent<any> = ((props) => {
    const classes = useStyles();

    const [name, changeName] = useState('')
    const [image, changeImage] = useState<any>(null)
    const [realm, changeRealm] = useState('')
    const [governance, changeGovernance] = useState('')
    const [primaryPopulation, changePrimaryPopulation] = useState('')
    const [type, changeType] = useState('')
    const [description, changeDescription] = useState('')
    const [rating, changeRating] = useState(0)
    const [numVisited, changeNumVisited] = useState(0)

  const updateName = (event:any) => {
      event.preventDefault()
      changeName(event.currentTarget.value)
  }
  const updateRealm = (event:any) => {
    event.preventDefault()
    changeRealm(event.currentTarget.value)
  }
  const updateGovernance = (event:any) => {
    event.preventDefault()
    changeGovernance(event.currentTarget.value)
}
  const updatePrimaryPopulation = (event:any) => {
      event.preventDefault()
      changePrimaryPopulation(event.currentTarget.value)
  }
  const updateType = (event:any) => {
      event.preventDefault()
      changeType(event.currentTarget.value)
  }
  const updateDescription = (event:any) => {
    event.preventDefault()
    changeDescription(event.currentTarget.value)
}
const updateRating = (event:any) => {
    event.preventDefault()
    changeRating(event.currentTarget.value)
}
const updateNumVisited = (event:any) => {
    event.preventDefault()
    changeNumVisited(event.currentTarget.value)
}

const updateImage = (event:any) => {
    let file:File = event.currentTarget.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      changeImage(reader.result)
    }
}

    
    
    // const newLocationSubmit = async (e:SyntheticEvent) => {
    //   e.preventDefault()
      
    //     let res = await createNewLocation(name, image, realm, governance, primaryPopulation, type, description, rating, numVisited)        
    //     props.changeNewUser(res)
    //     props.history.push(`/profile/${res.locationId}`) 
        
    // }

    const dispatch = useDispatch()
    
    const newLocationSubmit = async (e:SyntheticEvent) => {
      e.preventDefault()

        //new usr doesnt need a role because they default to "User"
        let thunk = newLocationActionMapper(name, image, realm, governance, primaryPopulation, description, rating, numVisited)
        dispatch(thunk) 
    }

    

  return (
    <form className={classes.root} autoComplete="off" onSubmit={newLocationSubmit}>
      <div>
      <TextField
          id="standard-password-input"
          autoComplete="off"
          label="Name"
          value ={name} 
          onChange = {updateName}
        />
        <br />
        <TextField
          id="standard-password-input"
          autoComplete="off"
          value ={image} 
          onChange = {updateImage}
          
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Realm"
          autoComplete="off"
          value ={realm} 
          onChange = {updateRealm}
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Governance"
          autoComplete="off"
          value ={governance} 
          onChange = {updateGovernance}

        />
        <br />
        <TextField
          id="standard-password-input"
          label="Primary Population"
          autoComplete="off"
          value ={primaryPopulation} 
          onChange = {updatePrimaryPopulation}

        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Type"
          autoComplete="off"
          multiline
          value ={type} 
          onChange = {updateType}

        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Description"
          autoComplete="off"
          value ={description} 
          onChange = {updateDescription}

        />
        <br/>
        <TextField
          id="standard-password-input"
          label="Rating"
          type="email"
          autoComplete="off"
          value ={rating} 
          onChange = {updateRating}

        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Role"
          autoComplete="off"
          value ={numVisited} 
          onChange = {updateNumVisited}

        />
        <br />
        <label htmlFor='file'>
          Profile Picture
        </label>
        <hr />
        <input type='file' name='file' accept='image/*' onChange={updateImage}></input>
        <img src={image} width="150" height="200"/>
        <hr />

        <Button type = 'submit' variant = 'contained' color = 'primary' onClick={newLocationSubmit}> Submit </Button>

      </div>
    </form>
  )


})