import React, { Component } from 'react';
import FccMap from './FccMap';
import { latlng } from './utils';
import { getExtensions, subscribeToFeatures, getFestMap } from './googleApi';
// import backgroundJSON from './PFF-Map.geojson';
// import './seed-datastore';

class App extends Component {
  state = {
    showFestMap: true,
    center: latlng(40.285801, -75.451331),
    zoom: [15.5],
    markers: [],
    mousePoint: { x: 0, y: 0 },
    mouseLatLng: { lng: 0, lat: 0 },
    popupCoords: [],
    popupContents: '',
    backgroundJSON: {},
  };

  componentDidMount() {
    this.refreshPhoneExtensions();
    this.refreshBackgroundJSON();
    subscribeToFeatures(snapshot => this.setState({ markers: snapshot }));
  }

  refreshBackgroundJSON = async () =>
    this.setState({ backgroundJSON: await getFestMap() });

  refreshPhoneExtensions = async () =>
    this.setState({ phones: await getExtensions() });

  setMousePos = (map, e) => {
    this.setState({
      mousePoint: e.point,
      mouseLatLng: e.lngLat,
    });
  };

  echoCurrentLatLng = () =>
    console.log(`${this.state.mouseLatLng.lat}, ${this.state.mouseLatLng.lng}`);

  toggleState = name => this.setState({ [name]: !this.state[name] });

  toggleFestMap = () => this.toggleState('showFestMap');

  render() {
    const {
      center,
      zoom,
      showFestMap,
      mousePoint,
      mouseLatLng,
      markers,
      backgroundJSON,
    } = this.state;
    const phones = markers.filter(x => x.type === 'phone');

    const buttonStyle = { height: '10vh', width: '15vw' };
    return (
      <div>
        <FccMap
          center={center}
          zoom={zoom}
          handleMouseMove={this.setMousePos}
          handleMapClick={this.echoCurrentLatLng}
          showFestMap={showFestMap}
          phones={phones}
          backgroundJSON={backgroundJSON}
        />
        <div style={{ display: 'flex' }}>
          <button onClick={this.toggleFestMap} style={buttonStyle}>
            background
          </button>
          <button style={buttonStyle}>add phone</button>
          <pre id="info" style={{ height: '10vh', width: '70vw' }}>
            {JSON.stringify(mousePoint)} <br /> {JSON.stringify(mouseLatLng)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
