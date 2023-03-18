import React from 'react';

const InputAudio = ({ handleAudioFileChange }) => (
  <div>
    <label htmlFor='audio'>Choose an audio file:</label>
    <input
      type='file'
      id='audio'
      name='audio'
      accept='audio/*'
      onChange={handleAudioFileChange}
    />
  </div>
);

export default InputAudio;
