import React from 'react';

const InputAnkiDeckName = ({ handleChange, value }) => (
  <div>
    <span>Anki deck name:</span>
    <input
      type='text'
      onChange={(e) => handleChange(e.target.value)}
      value={value}
    />
  </div>
);

export default InputAnkiDeckName;
