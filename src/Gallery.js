import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        const data = await response.json();
        setTours(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  return (
    <div className="gallery">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading tours.</p>
      ) : (
        tours.map((tour) => (
          <Tour key={tour.id} tour={tour} removeTour={removeTour} />
        ))
      )}
    </div>
  );
};

const Tour = ({ tour, removeTour }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="tour">
      <h2>{tour.name}</h2>
      <img src={tour.image} alt={tour.name} />
      <p>{showInfo ? tour.info : `${tour.info.substring(0, 100)}...`}</p>
      <button onClick={toggleInfo}>
        {showInfo ? 'Show Less' : 'Read More'}
      </button>
      <button onClick={() => removeTour(tour.id)}>Not Interested</button>
    </div>
  );
};

export default Gallery;
