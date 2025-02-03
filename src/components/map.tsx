import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map: React.FC = () => {
  useEffect(() => {
    const map = L.map('map', {
      center: [40.4093, 49.8671], // Начальная позиция (Москва)
      zoom: 13
    });

    // Добавляем слой OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Добавляем маркер
    L.marker([55.7558, 37.6173]).addTo(map);

    // Возвращаем функцию очистки для предотвращения утечек памяти
    return () => {
      map.remove();
    };
  }, []); // Пустой массив зависимостей, чтобы карта инициализировалась только один раз

  return <div id="map" style={{ width: '1680px', height: '690px' }}></div>;
};

export default Map;
