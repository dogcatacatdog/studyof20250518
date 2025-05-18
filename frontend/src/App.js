import React from 'react';
import { SaveSchedule, ScheduleList } from './components/ScheduleList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Today's Schedule</h1>
      <SaveSchedule />
      <ScheduleList />
    </div>
  );
}

export default App;