import React, { useEffect, useState } from 'react';
import './ScheduleList.css';

const parseKey = (key) => {
  const [date, time] = key.split('_');
  return { date, time };
};

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [editKey, setEditKey] = useState(null);
  const [editText, setEditText] = useState('');

  const loadSchedules = () => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (/\d{4}-\d{2}-\d{2}_\d{2}:\d{2}/.test(key)) {
        items.push({ key, ...parseKey(key), text: localStorage.getItem(key) });
      }
    }
    items.sort((a, b) => a.key.localeCompare(b.key));
    setSchedules(items);
  };

  useEffect(() => {
    loadSchedules();
    window.addEventListener('storage', loadSchedules);
    return () => window.removeEventListener('storage', loadSchedules);
  }, []);

  const handleEdit = (key, text) => {
    setEditKey(key);
    setEditText(text);
  };

  const handleEditSave = (key) => {
    localStorage.setItem(key, editText);
    setEditKey(null);
    setEditText('');
    loadSchedules();
  };

  return (
    <div className="schedule-list">
      <h2>Saved Schedules</h2>
      {schedules.length === 0 && <p>No schedules saved.</p>}
      <ul>
        {schedules.map(({ key, date, time, text }) => (
          <li key={key} className="schedule-item">
            <span className="schedule-date">{date}</span>
            <span className="schedule-time">{time}</span>
            {editKey === key ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={() => handleEditSave(key)}>Save</button>
                <button onClick={() => setEditKey(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className="schedule-text">{text}</span>
                <button onClick={() => handleEdit(key, text)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 날짜, 시간, 스케줄 입력 및 저장 기능 추가
const SaveSchedule = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!date || !time || !schedule) {
      alert('날짜, 시간, 스케줄을 모두 입력해주세요.');
      return;
    }
    const key = `${date}_${time}`;
    localStorage.setItem(key, schedule);
    setSchedule('');
    setTime('');
    setDate('');
    window.dispatchEvent(new Event('storage')); // 리스트 갱신
  };

  return (
    <div className="save-schedule">
      <h2>Save Schedule</h2>
      <form onSubmit={handleSubmit} className="save-schedule-form">
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
          value={schedule}
          onChange={e => setSchedule(e.target.value)}
          placeholder="Enter your schedule..."
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export { SaveSchedule, ScheduleList };