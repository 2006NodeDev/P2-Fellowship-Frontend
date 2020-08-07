import React, { FunctionComponent } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import image from '../../images/bag-end.jpg';
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
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
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
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        {tileData.map((tile:LocationImage) => (
            <img src={tile.image} height='100%' width='100%' />
        ))}
      </GridList>
    </div>
    :
    <div>
      No Image
    </div>
  );
}