import React, { useState, FunctionComponent, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker';
//import { getAllLocations } from '../../remote/location-service/getAllLocations';
import { Location } from '../../models/Location';
import { getAllLocations } from '../../remote/location-service/getAllLocations';

export const SimpleMap: FunctionComponent<any> = (props: any) => {
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: false,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };
    
    const [center, setCenter] = useState({lat: -39.156841, lng: 175.632148 });
    const [zoom, setZoom] = useState(6);

    let [allLocations, changeAllLocations] = useState<Location[]>([])

    useEffect(() => {
        const getLocations = async () => {
            let locations = await getAllLocations()
            changeAllLocations(locations)
        }

        if (!allLocations) {
            getLocations()
        }
    })
    let locationsTag = allLocations.map((location) => {
      return <Marker
      key={'locations-key-' + location.locationId}
      location={location}
      lat={location.latitude}
      lng={location.longitude}
  >
  </Marker>
})

    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDLNGQ9PmSweVI-1SLDlpS_4C-aQEu4w30' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
         {locationsTag}
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;