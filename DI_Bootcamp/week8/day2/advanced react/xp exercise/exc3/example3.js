import React, { Component } from 'react';
import data from './complexData.json';

class Example3 extends Component {
  render() {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <h3>Experiences</h3>
        {data.Experiences.map((exp) => (
          <div key={exp.id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            <h4>{exp.company}</h4>
            <p><strong>Role:</strong> {exp.role}</p>
            <p><strong>Year:</strong> {exp.year}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;