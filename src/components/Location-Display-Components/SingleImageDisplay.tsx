import React, { FunctionComponent } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { Location } from '../../models/Location';


interface ILocationProps {
  location: Location
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
    image: {
      width: 600,
      height: 500,
      margin: 'auto'

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


export const SingleImageDisplay: FunctionComponent<ILocationProps> = (props) => {
  const classes = useStyles();

  let locationImageLinks: string[]
  let tileData = undefined

  if (props.location.image){
    let imageObjectArray = props.location.image

    locationImageLinks = imageObjectArray.filter(function(obj) {
      if ('image' in obj) {
        return true
      } else {
        return false;
      }
    }).map(function(obj) { return obj["image"]});
    console.log(locationImageLinks);

    tileData = locationImageLinks[0]
  }
 

  //tileData is first image in the images array

  return (
    (tileData) ?
      <div className={classes.root}>

        <GridList>
          <img src={tileData} className={classes.image} />
        </GridList>

      </div>
      :
      <div>
        No Image
    </div>
  );
}