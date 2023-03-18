import React from 'react';

const SnippetCreatedOverlay = ({ ...children }) => (
  <div style={{ background: 'grey', pointerEvents: 'none' }}>{children}</div>
);

export default SnippetCreatedOverlay;
