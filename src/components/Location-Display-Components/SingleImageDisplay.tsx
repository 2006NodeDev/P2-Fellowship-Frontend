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
      width: "100%",
      height: 400,
      margin: 'auto'
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
          <img src={tileData} className={classes.image} />
      </div>
      :
      <div>
        No Image
    </div>
  );
}