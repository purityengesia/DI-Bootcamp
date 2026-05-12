import React, { useState } from 'react';

function Forms() {
  // Part I & IV: State variables for inputs
  // We use an object to hold multiple related values (username and age)
  const [inputs, setInputs] = useState({
    username: "",
    age: null
  });

  // Part V: State for the error message
  const [errormessage, setErrormessage] = useState("");

  // Part VI: State for Textarea
  const [description, setDescription] = useState("The content of a textarea goes in the value attribute");

  // Part VII: State for Select (Drop down)
  const [carBrand, setCarBrand] = useState("Volvo");

  // Part I & IV & V: Handle changes for Name and Age
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Part V Validation: Check if age is not numeric
    if (name === 'age' && value !== '' && isNaN(value)) {
      setErrormessage("Your age must be a number");
      // We still update the input state so the user can see what they typed and fix it
    } else {
      setErrormessage("");
    }

    setInputs(values => ({ ...values, [name]: value }));
  };

  // Part III: Handle Form Submission
  const mySubmitHandler = (event) => {
    event.preventDefault(); // Prevents the page from refreshing
    alert(`You are submitting: ${inputs.username}`);
  };

  // Part VI: Handle Textarea change
  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  // Part VII: Handle Select change
  const handleCarChange = (event) => {
    setCarBrand(event.target.value);
  };

  // Part II: Conditional Rendering Logic
  let header;
  if (inputs.username) {
    // We display both username and age if they exist
    header = <h1>Hello {inputs.username} {inputs.age}</h1>;
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '400px' }}>
      <h3>Exercise: Form</h3>
      
      {/* Part II: Render header variable */}
      {header}

      {/* Part V: Render Error Message */}
      {errormessage && <p style={{ color: 'red' }}>{errormessage}</p>}

      {/* Part III: Form with onSubmit */}
      <form onSubmit={mySubmitHandler}>
        
        {/* Part I: Name Input */}
        <div style={{ marginBottom: '10px' }}>
          <label>Enter your name:</label><br />
          <input
            type='text'
            name='username'
            value={inputs.username}
            onChange={handleChange}
          />
        </div>

        {/* Part IV: Age Input */}
        <div style={{ marginBottom: '10px' }}>
          <label>Enter your age:</label><br />
          <input
            type='text' // Kept as text per exercise requirements to demonstrate validation
            name='age'
            // We use || "" because value cannot be null for a controlled input
            value={inputs.age || ""}
            onChange={handleChange}
          />
        </div>

        {/* Part III: Submit Button */}
        <input type='submit' />
      </form>

      <hr style={{ margin: '20px 0' }} />

      {/* Part VI: Textarea */}
      <div style={{ marginBottom: '10px' }}>
        <h4>Part VI: Textarea</h4>
        <textarea 
          value={description} 
          onChange={handleDescChange}
          rows={4}
          cols={40}
        />
      </div>

      {/* Part VII: Select Box */}
      <div>
        <h4>Part VII: Select</h4>
        <select value={carBrand} onChange={handleCarChange}>
          <option value="Ford">Ford</option>
          <option value="Volvo">Volvo</option>
          <option value="Fiat">Fiat</option>
        </select>
        <p>Selected: <strong>{carBrand}</strong></p>
      </div>

    </div>
  );
}

export default Forms;