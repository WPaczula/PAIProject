import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import Helmet from 'react-helmet'
import { MapContainer } from '../style'

class MapComponent extends Component {
  constructor(props) {
    super(props)

    this.map = React.createRef()
  }

  componentWillMount() {
    this.loadMap()
  }

  componentDidUpdate() {
    this.loadMap()
  }

  loadMap = () => {
    const { position, loading } = this.props

    if (typeof window !== 'undefined') {
      const {
        Map, Marker, TileLayer,
      } = require('react-leaflet')

      if (!loading) {
        const MapContent = () => (
          <Map
            ref={this.map}
            center={position}
            zoom={18}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={position} />
          </Map>
        )

        setTimeout(() => render(<MapContent />, document.getElementById('map')))
      }
    }
  }

  handleScroll = () => {
    console.log(this.map.current)
  }

  render() {
    const { loading } = this.props

    return (
      <>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossOrigin=""
          />
        </Helmet>
        <style>
          {
            `.leaflet-container {
            height: 100%;
            width: 100%;
            }`
            }
        </style>
        <MapContainer onScroll={this.handleScroll} id="map" loading={loading} />
      </>
    )
  }
}

MapComponent.propTypes = {
  position: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ),
  loading: PropTypes.bool,
}

export default MapComponent
