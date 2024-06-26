import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup,} from 'react-leaflet';
import "leaflet/dist/images/marker-icon.png"
import "leaflet/dist/images/marker-shadow.png"
import './map.css';
import './leaflet.css';
import Airtable from 'airtable';
import L from 'leaflet';

interface Record {
  id: string;
  fields: {
    name: string;
    latitude: number;
    longitude: number;
  };
}
const dotIcon = new L.DivIcon({
  className: 'custom-dot', // Custom class for additional styling
  html: '<div style="background-color: black; width: 0.4rem; height: 0.4rem; border-radius: 50%;"></div>',

  iconSize: [10, 10] // Size of the dot
});
const airtableBase = new Airtable({ apiKey: 'patXZkmsbNWuYNpnX.8b27ebb6670cb7013eb1cffa880b92433bc0ded9ff2225783d34bc9c3085596d' }).base('app3loNcvd921Yy1G');

const Map: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    airtableBase('tblEWSBsuQrVhfck7').select().all((err, airtableRecords) => {
      if (err) {
        console.error(err);
        return;
      }
      if (airtableRecords) {
        const mappedRecords: Record[] = airtableRecords.map(record => ({
          id: record.id,
          fields: {
            name: record.fields.name as string,
            latitude: record.fields.latitude as number,
            longitude: record.fields.longitude as number,
          }
        }));
        console.log(mappedRecords);
        setRecords(mappedRecords);
      }
    });
  }, []);

  return (
    <MapContainer zoomControl= {false}  attributionControl={false} center={[18.38, 2.3522]} zoom={2} className='map'>
      <TileLayer
        /* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */
        url="http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png'"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {records.map(record => (
           <Marker 
           key={record.id} 
           position={[record.fields.latitude, record.fields.longitude]} 
           icon={dotIcon}
           eventHandlers={{
             mouseover: (e) => {
               e.target.openPopup();
             },
             mouseout: (e) => {
               e.target.closePopup();
             },
           }}
         >
           <Popup>
             <strong>{record.fields.name}</strong><br />
           </Popup>
         </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;