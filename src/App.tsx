import React from 'react';
import './App.css';
import AppContainer from 'stores/containers/AppContainer';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <AppContainer />
    </React.Fragment>
  );
}

export default App;