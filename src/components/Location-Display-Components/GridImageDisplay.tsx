import React, { FunctionComponent } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width:1000,
      height: 300
    
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }),
);


// const tileData = [
//   //add the image array here
//   {
//     img: image,
//     author: 'author',
//   },

// ];



export const GridImageDisplay:FunctionComponent<ILocationProps> = (props) => {
  const classes = useStyles();
  
  const tileData = props.location.image

  //tileData is first image in the images array

  return (
    (tileData)?
    <div className={classes.root} style={{marginTop: 20}}>
      <br/>

      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData.map((tile:LocationImage) => (
          <GridListTile key={tile.image} cols={1}>
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