import React from 'react';

export const Home = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
        `}
      </style>
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="container flex flex-col items-center justify-center px-4 py-8">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 text-white tracking-wide text-center"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              textTransform: 'uppercase',
              color: '#e5e1d8',
              letterSpacing: '0.05em',
            }}
          >
            Track Your Carbon Footprint
          </h1>
          <p
            className="text-xl md:text-2xl text-center max-w-4xl"
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              color: '#e5e1d8',
              fontWeight: 500,
              marginBottom: 300,
            }}
          >
            Show you care for the environment and join millions in the fight against climate change. Monitor, reduce, and offset your environmental impact.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;