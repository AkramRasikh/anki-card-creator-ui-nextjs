import React from 'react';

const InputAudio = ({ handleAudioFileChange }) => (
  <div>
    <label htmlFor='audio'>Choose an audio file:</label>
    <input
      type='file'
      id='audio'
      name='audio'
      accept='audio/mp3'
      onChange={handleAudioFileChange}
    />
  </div>
);

export default InputAudio;
