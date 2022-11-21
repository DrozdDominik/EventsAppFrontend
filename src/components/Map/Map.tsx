import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import './Map.css'
import 'leaflet/dist/leaflet.css';
import '../../utils/map-icons'
import { MainEventData } from "types";
import {Link} from "react-router-dom";

const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors";

interface Props {
    events: MainEventData[],
}

export const Map = (props: Props) => {
    return (
        <div className={"map"}>
            <MapContainer center={[51.5, 20]} zoom={6}>
                <TileLayer url={mapUrl} attribution={attribution} />
            {
                props.events.map(event => (
                    <Marker key={event.id} position={[event.lat, event.lon]}>
                        <Popup>
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <Link to={`/event/${event.id}`}>Szczegóły</Link>
                        </Popup>
                    </Marker>
                ))
            }
            </MapContainer>
        </div>
    )
}
