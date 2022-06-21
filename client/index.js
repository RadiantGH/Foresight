import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import App from './components/App.jsx';

render(
    // wrap the App in the Provider Component and pass in the store
    <div>
      <App />
    </div>
    , document.getElementById('content')
);