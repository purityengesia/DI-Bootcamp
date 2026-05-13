import React from 'react';

const FormComponent = (props) => {
  return (
    <div className="form-container">
      <form onSubmit={props.handleSubmit}>
        <h1>Sample Form</h1>

        {/* Text Inputs */}
        <div className="input-group">
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            value={props.data.firstName} 
            onChange={props.handleChange} 
          />
        </div>

        <div className="input-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastName" 
            value={props.data.lastName} 
            onChange={props.handleChange} 
          />
        </div>

        <div className="input-group">
          <label>Age:</label>
          <input 
            type="number" 
            name="age" 
            value={props.data.age} 
            onChange={props.handleChange} 
          />
        </div>

        {/* Select Inputs */}
        <div className="input-group">
          <label>Gender:</label>
          <select 
            name="gender" 
            value={props.data.gender} 
            onChange={props.handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="input-group">
          <label>Destination:</label>
          <select 
            name="destination" 
            value={props.data.destination} 
            onChange={props.handleChange}
          >
            <option value="Japan">Japan</option>
            <option value="USA">USA</option>
            <option value="Europe">Europe</option>
            <option value="Brazil">Brazil</option>
          </select>
        </div>

        {/* Checkbox Input */}
        <div className="input-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              name="lactoseFree" 
              checked={props.data.lactoseFree} 
              onChange={props.handleChange} 
            />
            Lactose Free?
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;