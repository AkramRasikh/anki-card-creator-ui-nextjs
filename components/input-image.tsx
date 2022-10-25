import React from 'react';

const InputImage = ({ handleImageFileChange }) => (
  <div>
    <label htmlFor='image'>Choose an image file:</label>
    <input
      type='file'
      id='image'
      name='image'
      accept='image/*'
      onChange={handleImageFileChange}
    />
  </div>
);

export default InputImage;
