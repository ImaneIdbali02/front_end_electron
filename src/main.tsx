import * as React from 'react';
import ReactDOM from 'react-dom';
import Navebar from 'components/Navebar'; // Import your component

ReactDOM.render(
  <React.StrictMode>
    <Navebar /> {/* Render your component */}
  </React.StrictMode>,
  document.getElementById('root') // Assuming you have a root element in your HTML file with the id "root"
);
