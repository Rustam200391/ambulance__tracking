import React, { useState, useEffect } from 'react';
import Map from './components/map';

interface Location {
  lat: number;
  lng: number;
}

const App: React.FC = () => {
  const [ambulanceLocation, setAmbulanceLocation] = useState<Location>({
    lat: 55.7558, // начальная позиция
    lng: 37.6173
  });

  const [isTracking, setIsTracking] = useState<boolean>(true);
  const [isGoogleMapsPaid, setIsGoogleMapsPaid] = useState<boolean>(true); // флаг для платной подписки

  const toggleTracking = () => {
    setIsTracking((prev) => !prev);
  };

  useEffect(() => {
    if (isTracking) {
      // Подключаем WebSocket или API для получения координат
      const socket = new WebSocket('ws://localhost:8080');
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setAmbulanceLocation({
          lat: data.lat,
          lng: data.lng
        });
      };

      return () => {
        socket.close();
      };
    }
  }, [isTracking]);

  return (
    <div>
      <h1>Онлайн-отслеживание скорой помощи</h1>
      
      {isGoogleMapsPaid ? (
        <div style={{ backgroundColor: 'yellow', padding: '10px' }}>
          Используется платная подписка на Google Maps API.
        </div>
      ) : (
        <div style={{ backgroundColor: 'red', padding: '10px' }}>
          Это приложение требует платной подписки для корректной работы с Google Maps API.
        </div>
      )}

      <Map ambulanceLocation={ambulanceLocation} />
      
      <div>
        <button onClick={toggleTracking}>
          {isTracking ? 'Остановить отслеживание' : 'Начать отслеживание'}
        </button>
        <div>
          Координаты: {`Lat: ${ambulanceLocation.lat}, Lng: ${ambulanceLocation.lng}`}
        </div>
      </div>
    </div>
  );
};

export default App;
