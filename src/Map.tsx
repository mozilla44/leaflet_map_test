import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup,} from 'react-leaflet';
import "leaflet/dist/images/marker-shadow.png"


import 'leaflet/dist/leaflet.css';
import Airtable from 'airtable';
import './map.css';

interface Record {
  id: string;
  fields: {
    name: string;
    latitude: number;
    longitude: number;
    description: string;
  };
}

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
            description: record.fields.description as string,
          }
        }));
        setRecords(mappedRecords);
      }
    });
  }, []);

  return (
    <MapContainer  attributionControl={false} center={[18.38, 2.3522]} zoom={2} className='map'>
      <TileLayer
        /* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */
        url="http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png'"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {records.map(record => (
        <Marker key={record.id} position={[record.fields.latitude, record.fields.longitude]}>
          <Popup>
            <strong>{record.fields.name}</strong><br />
            {record.fields.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;