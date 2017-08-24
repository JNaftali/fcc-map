import React from 'react';
import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl';
import mapImage from './fest-map-latest.png';
import { latlng } from './utils';

// var mapPixels = { width: 1035, height: 800 };

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoiam5hZnRhbGkiLCJhIjoiY2o2b3p0eDQ2MGFoZjJybXN1emUzN2NlMSJ9.mhng6mI2LW9wEUKyZJ68SA',
});

function FccMap({
  center,
  zoom,
  handleMouseMove,
  handleMapClick,
  showFestMap,
  phones,
}) {
  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9" //eslint-disable-line react/style-prop-object
      containerStyle={{
        height: '90vh',
        width: '100vw',
      }}
      center={center}
      zoom={zoom}
      bearing={-140}
      onMouseMove={handleMouseMove}
      onClick={handleMapClick}
    >
      <Source
        id="background_source"
        tileJsonSource={{
          type: 'image',
          url: mapImage,
          coordinates: getBackgroundCoords(),
        }}
      />
      {showFestMap &&
        <Layer
          type="raster"
          id="background_layer"
          sourceId="background_source"
          paint={{ 'raster-opacity': 0.85 }}
        />}
      <Layer
        type="circle"
        id="phones_layer"
        paint={{ 'circle-color': 'black' }}
      >
        {phones.map(phone =>
          <Feature key={phone.id} coordinates={latlng(phone.lat, phone.lng)} />
        )}
      </Layer>
    </Map>
  );
}

export default FccMap;

function getBackgroundCoords() {
  const bottomLeft = latlng(40.285983, -75.44466),
    topRight = latlng(40.28637, -75.458687);
  let height = 0.007;
  const angle = -135;
  let [left, bottom] = bottomLeft;
  let [right, top] = topRight;
  let topLeft = [
    left + Math.cos(angle * (Math.PI / 180)) * height,
    bottom + Math.sin(angle * (Math.PI / 180)) * height,
  ];
  let bottomRight = [
    right - Math.cos(angle * (Math.PI / 180)) * height,
    top - Math.sin(angle * (Math.PI / 180)) * height,
  ];
  return [topLeft, topRight, bottomRight, bottomLeft];
}
