import React, { useState, FunctionComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker';
//import { Locations } from '../../models/Location';
//import { getAllLocations } from '../../remote/location-service/getAllLocations';

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
    
    return (
        <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'key here' }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={getMapOptions}
        >
          <Marker
            lat={-39.156841}
            lng={ 175.632148}
          />
          <Marker
            lat={-37.872003}
            lng={175.682917}
          />
        </GoogleMapReact>
      </div>
    );
}

export default SimpleMap;