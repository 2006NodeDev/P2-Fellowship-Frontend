//display a user's profile in partial detail

import 'react-toastify/dist/ReactToastify.css';
import React, { FunctionComponent, useEffect, useState } from 'react'
import { User } from '../../models/User'
import { makeStyles, Card, CardContent, Typography, CardMedia, Grid, GridList, ListSubheader, GridListTile, GridListTileBar } from '@material-ui/core'
import { getAllUsers } from '../../remote/user-service/getAllUsers';
// import Image from '../../images/Gandalf.jpg'
interface IUserDisplayProps {
  user: User
}

const useStyles = makeStyles((theme)=>({ //customize this more!
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}))


export const UserCardDisplayComponent: FunctionComponent<IUserDisplayProps> = (props) => {
  const classes = useStyles();

  let [allUsers, changeAllUsers] = useState<User[]>([])

  //query the server
  useEffect(() => {
      const getUsers = async () => {
          let response = await getAllUsers() //returning undefined
          console.log(response);
          changeAllUsers(response)
      }

      if (allUsers.length === 0) {
          getUsers()
      }
  })

  return (

  <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {allUsers.map((tile) => (
            <GridListTile key={tile.userId}>
              <img src={tile.image} alt={"Profile Picture"}/>
              <GridListTileBar
                title={tile.firstName}
                subtitle={<span>Affiliation: {tile.affiliation}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
  );

  //   (props.user) ?
  //     <Grid
  //       container
  //       spacing={0}
  //       direction="column"
  //       alignItems="center"
  //       justify="center"
  //       style={{ minHeight: '100vh' }}
  //     >
  //       <Card className={classes.root}>
  //         <br />
  //         <CardMedia
  //           className={classes.media}
  //           style={{marginTop: 20}}
  //           image={props.user.image}
  //           component="img"
  //           title="Profile Picture"
  //         />
  //         <CardContent>
  //           <Typography className={classes.name} gutterBottom >
  //             NAME: {props.user.firstName}
  //           </Typography>
  //           <Typography className={classes.userInfo} >
  //             AFFILIATION: {props.user.affiliation}
  //           </Typography>
  //           <Typography className={classes.userInfo} >
  //             ROLE: {props.user.role}
  //           </Typography>
  //           <Typography className={classes.userInfo} >
  //             PLACES VISITED: {props.user.placesVisited}
  //           </Typography>
  //         </CardContent>

  //       </Card>
  //     </Grid>

  //     :
  //     <div>
  //       <h3> User Not Found</h3>
  //     </div>
  // )

}