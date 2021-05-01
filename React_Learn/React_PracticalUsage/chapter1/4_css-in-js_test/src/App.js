import React from 'react';
import Box from './Box_unDynamic';
import Box_dynamic from './Box_dynamic';

function App() {
  return (
    <div className="App">
      <Box size='big'/>
      <Box size='small'/>

      <Box_dynamic size='big'/>
      <Box_dynamic size='small'/>
    </div>
  );
}

export default App;