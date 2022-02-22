import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App1 from './App1';
// import App2 from './App2';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
<div className='home'>
<div className="welcome-block"><h1><b> Welcome to Connectify</b></h1></div>

<div className="welcome-block"><h3> Please select a playlist for transfering below</h3></div>

    <App1 />
</div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
