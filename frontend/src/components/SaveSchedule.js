// This file exports a component ScheduleList that displays a list of scheduled items.
import React, { useState, useEffect } from 'react';

const ScheduleList = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const storedSchedules = Object.keys(localStorage)
            .filter(key => key.startsWith('schedule_'))
            .map(key => localStorage.getItem(key));
        setSchedules(storedSchedules);
    }, []);

    return (
        <div className="schedule-list">
            <h2>Today's Schedule</h2>
            <ul>
                {schedules.length > 0 ? (
                    schedules.map((schedule, index) => (
                        <li key={index}>{schedule}</li>
                    ))
                ) : (
                    <li>No schedules for today.</li>
                )}
            </ul>
        </div>
    );
};

const SaveSchedule = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [text, setText] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!date || !time || !text) return;

    const key = `schedule_${date}_${time}`;
    localStorage.setItem(key, text);

    setText('');
    alert('Schedule saved!');
    window.dispatchEvent(new Event('storage')); // ScheduleList 갱신용
  };

  return (
    <form className="save-schedule-form" onSubmit={handleSave}>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        required
      />
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter schedule"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export { ScheduleList, SaveSchedule };