import React, { FunctionComponent } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Location } from '../../models/Location';
import { LocationImage } from '../../models/LocationImage';


interface ILocationProps{
  location:Location
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'hidden',
      alignContent: "center",
      marginLeft: 30
    },
    gridList: {
      width:"100%",
      height: "100%", 
      alignItems: 'center',
      justifyContent: 'center'
    },
  }),
);



export const GridImageDisplay:FunctionComponent<ILocationProps> = (props) => {
  const classes = useStyles();
  
  const tileData = props.location.image

  //tileData is first image in the images array

  return (
    (tileData)?
    <div className={classes.root} style={{marginTop: 20}}>
      <br/>

      <GridList cellHeight={300} className={classes.gridList} cols={3}>
        
        {tileData.map((tile:LocationImage) => (
          <GridListTile key={tile.image} cols={3}>
            <img src={tile.image}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
    :
    <div>
      No Image
    </div>
  );
}