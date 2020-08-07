import React, { FunctionComponent } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import image from '../../images/bag-end-1.jpg';
import { Location } from '../../models/Location';


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
      width: 300,
      height: 173,
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0) 10%)',
    },
  }),
);


const tileData = [
  //add the image array here
  {
    img: image,
    author: 'author',
  },

];



export const SingleImageDisplay:FunctionComponent<ILocationProps> = (props) => {
  const classes = useStyles();
  
 // const tileData = props.location.image?.pop()

  //tileData is first image in the images array

  return (
    (tileData)?
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={1}>
        {tileData.map((tile) => (
          
            <img src={tile.img} height='100%' width='100%' />
            
        ))}
      </GridList>
    </div>
    :
    <div>
      No Image
    </div>
  );
}