import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './MapDetailed.css';
import 'leaflet/dist/leaflet.css';
import '../../utils/map-icons';
import { EventEntity } from 'types';

const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors";

interface Props {
  event: EventEntity;
}

export const MapDetailed = (props: Props) => {
  return (
    <div className={'mapDetailed'}>
      <MapContainer center={[props.event.lat, props.event.lon]} zoom={10}>
        <TileLayer url={mapUrl} attribution={attribution} />
        <Marker position={[props.event.lat, props.event.lon]}>
          <Popup className={'popup'}>
            <h3>{props.event.name}</h3>
            <p>{props.event.description}</p>
            {props.event.link && (
              <p>
                <a
                  className={'link'}
                  href={props.event.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i>Wyświetl stronę wydarzenia</i>
                </a>
              </p>
            )}
          </Popup>
        </Marker>
        ))
      </MapContainer>
    </div>
  );
};
