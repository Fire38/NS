import React from 'react';
import Leaflet from 'leaflet';
import Control from 'react-leaflet-control';
import {Map, Polyline, Popup, TileLayer} from 'react-leaflet'
  
import TopologyLayer from './topologyLayer.js';
import NetworkPointLayer from './networkPointLayer.js';


export class SimpleExample extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 56.1585,
      lng: 101.6185,
      zoom: 14,
      topologyLayer: true,
      networkPointLayer: true,
      networkPoints: []
    }
    this.handleTopologyLayer = this.handleTopologyLayer.bind(this)
    this.handleNetworkPointLayer = this.handleNetworkPointLayer.bind(this)
    this.getNetworkPoint = this.getNetworkPoint.bind(this)
  }
  
  async getNetworkPoint(){
    let res = await fetch("/api/bind/").then(response => response.json())
    console.log(res)
    this.setState({networkPoints: res})
  }
  
  componentDidMount(){
    document.title = "Карта";
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.on('click', (e) =>{
  
        console.log(e.latlng)
    })
    this.getNetworkPoint()
  }
  
  
  handleTopologyLayer(){
    let toggle = this.state.topologyLayer ? false: true
    this.setState({topologyLayer: toggle})
  }
  
  handleNetworkPointLayer(){
    let toggle = this.state.networkPointLayer ? false: true
    this.setState({networkPointLayer: toggle})
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const polyline1 = [[56.1555, 101.6220], [56.1546, 101.6209], [56.1547, 101.6198], [56.1544, 101.6193]]
       
    return (
      <div id="map-wrapper">
        <Map ref={m => {this.leafletMap=m;}} center={position} zoom={this.state.zoom}>
          
          <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />

           <TopologyLayer enable={this.state.topologyLayer} coord={polyline1}/>
           <NetworkPointLayer enable={this.state.networkPointLayer} networkPoints={this.state.networkPoints}/>
           
            <Control position="topright">
              <div>
                <button
                  style={{"backgroundColor": this.state.topologyLayer ? "green": "red"}}
                  onClick={this.handleTopologyLayer}>Ветки</button>
                <button
                  style={{"backgroundColor": this.state.networkPointLayer ? "green": "red"}}
                  onClick={this.handleNetworkPointLayer}>Оборудование</button>
              </div>
            </Control>
        </Map>
      </div>
    );
  }
}
