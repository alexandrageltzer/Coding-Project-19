import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('/api/react-tours-project'); // Use the proxy path
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  return (
    <div className="gallery">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading tours.</p>
      ) : (
        tours.map(tour => (
          <div key={tour.id} className="tour">
            <h2>{tour.name}</h2>
            <img src={tour.image} alt={tour.name} />
            <p>{tour.info}</p>
            <button onClick={() => removeTour(tour.id)}>Not Interested</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;
