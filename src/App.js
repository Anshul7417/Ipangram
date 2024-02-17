import React, { useState } from 'react';
import { format, addWeeks, subWeeks, setWeek, setDay, setHours } from 'date-fns';

const App = ({}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');

  const moveWeeks = (weeks) => {
    setCurrentDate((prevDate) => (weeks > 0 ? addWeeks(prevDate, weeks) : subWeeks(prevDate, Math.abs(weeks))));
  };

  const changeTimezone = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const renderWeeklySchedule = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const workingHours = Array.from({ length: 16 }, (_, i) => i + 8); // 8AM to 11PM

    return (
      <table>
        <thead>
          <tr>
            <th>Day</th>
            {workingHours.map((hour) => (
              <th key={hour}>{`${hour}:00`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeek.map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {workingHours.map((hour) => (
                <td key={`${day}-${hour}`}>
                  <input type="checkbox" id={`${day}-${hour}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <div>
        <p>{`Current Date: ${format(currentDate, 'MMMM dd, yyyy')}`}</p>
        <button onClick={() => moveWeeks(-1)}>Previous Week</button>
        <button onClick={() => moveWeeks(1)}>Next Week</button>
      </div>
      <div>
        <label htmlFor="timezoneSelect">Select Timezone: </label>
        <select id="timezoneSelect" onChange={changeTimezone}>
          <option value="UTC">UTC</option>
          <option value="CET">CET</option>
        </select>
      </div>
      <div>
        <h2>{`Weekly Schedule (${selectedTimezone})`}</h2>
        {renderWeeklySchedule()}
      </div>
    </div>
  );
};

export default App;
