//display return from Full User Card Display Component
import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllUsers } from '../../remote/user-service/getAllUsers'
import { User } from '../../models/User'
import { useSelector } from 'react-redux'
import { IState } from '../../reducers'
import { makeStyles, GridList, GridListTile, ListSubheader, GridListTileBar, IconButton } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme)=>({ //customize this more!
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: "100%",
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    label: {
        fontSize: 30,
        color: 'black',
        fontFamily: "Bookman Old Style"
    },
    gridList: {
      width: "100%",
      height: "100%",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }))
  
export const AllUsersComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    //get current user (to allow access to page)
    const thisUser = useSelector((state: IState) => {
        return state.loginState.currUser
    })

    let [allUsers, changeAllUsers] = useState<User[]>([])

    //query the server
    useEffect(() => {

        const getUsers = async () => {
            let response = await getAllUsers() //doesn't affect state rn... idk if it needs to though... 
            console.log(response);
            changeAllUsers(response)
        }

        if (!allUsers) {
            getUsers()
        }
    })

    console.log(allUsers);
    
    if (thisUser && thisUser.role==="Admin"){ 
        return (
            (allUsers) ?
            <div className={classes.root}>
                <GridList cellHeight={300} cols={3} className={classes.gridList}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                    <ListSubheader className={classes.label}>All Users</ListSubheader>
                </GridListTile>
                {allUsers.map((tile) => (
                    <GridListTile key={tile.userId}>
                    <Link to={`/users/profile/${tile.userId}`}>
                        <img src={tile.image} alt={"Profile Picture"}/>
                        <GridListTileBar
                            title={tile.firstName}
                            subtitle={<span>Affiliation: {tile.affiliation}<br/> Places Visted:{tile.placesVisited} </span>}
                        />
                    </Link>
                    </GridListTile>
                ))}
                </GridList>
            </div>
            :
            <div>
                No Users Found
            </div>
        )
    } else if (thisUser){
        return (
            (allUsers) ?
            <div className={classes.root}>
                <GridList cellHeight={300} cols={3} className={classes.gridList}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                    <ListSubheader className={classes.label}>All Users</ListSubheader>
                </GridListTile>
                {allUsers.map((tile) => (
                    <GridListTile key={tile.userId}>
                    <img src={tile.image} alt={"Profile Picture"}/>
                    <GridListTileBar
                        title={tile.firstName}
                        subtitle={<span>Affiliation: {tile.affiliation} <br/> Places Visted:{tile.placesVisited} </span>}
                    />
                    </GridListTile>
                ))}
                </GridList>
            </div>
            :
            <div>
                No Users Found
            </div>
        )
    } else {
        return (
            <div>
                No Users Found
            </div>
        )
    }

   
}


