import React from 'react';
import './App.css';

import Routes from './routes';
import drac from './assets/dracula.svg';

function themeChange(e) {
   if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dracula');
   } else {
      document.documentElement.removeAttribute('data-theme');
   }
}

function App() {
   return (
      <div className="App">
         <div className="theme-switch-wrapper">
            <img src={drac} alt="dracula logo" />
            <label className="theme-switch">
               <input type="checkbox" id="checkbox" onChange={themeChange} />
               <div className="slider round"></div>
            </label>
         </div>
         <Routes />
      </div>
   );
}

export default App;
