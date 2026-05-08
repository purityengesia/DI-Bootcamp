// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS here
import BootstrapCard from './BootstrapCard';
import PlanetList from './PlanetList';

const celebrities = [
  {
    title: 'Bob Dylan',
    imageUrl: 'https://miro.medium.com/max/4800/1*_EDEWvWLREzlAvaQRfC_SQ.jpeg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Bob_Dylan',
    description:
      'Bob Dylan (born Robert Allen Zimmerman, May 24, 1941) is an American singer/songwriter, author, and artist who has been an influential figure in popular music and culture for more than five decades.',
  },
  {
    title: 'McCartney',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Paul_McCartney_in_October_2018.jpg/240px-Paul_McCartney_in_October_2018.jpg',
    buttonLabel: 'Go to Wikipedia',
    buttonUrl: 'https://en.wikipedia.org/wiki/Paul_McCartney',
    description:
      'Sir James Paul McCartney CH MBE (born 18 June 1942) is an English singer, songwriter, musician, composer, and record and film producer who gained worldwide fame as co-lead vocalist and bassist for the Beatles.',
  },
];

function App() {
  return (
    <div className="container">
      {/* Exercise 1: Bootstrap Card */}
      <h2 className="mt-4">Exercise 1: Celebrities</h2>
      <div className="d-flex justify-content-around flex-wrap">
        {celebrities.map((person, index) => (
          // We render the BootstrapCard twice by mapping over the array
          <BootstrapCard
            key={index}
            title={person.title}
            imageUrl={person.imageUrl}
            buttonLabel={person.buttonLabel}
            buttonUrl={person.buttonUrl}
            description={person.description}
          />
        ))}
      </div>

      <hr />

      {/* Exercise 2: Planets */}
      <h2>Exercise 2: Planets</h2>
      <PlanetList />
    </div>
  );
}

export default App;