import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    // Initialize state with the current time immediately
    this.state = this.getCurrentTime();
  }

  // Helper function to get all date details
  getCurrentTime = () => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      dayOfWeek: now.getDay(),
      dayOfMonth: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    };
  };

  // 2. Create a setInterval when the component mounts
  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState(this.getCurrentTime());
    }, 1000);
  }

  // Clean up the interval when the component unmounts
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // Helper for names
  getDayName = (dayIndex) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  };

  getMonthName = (monthIndex) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  };

  formatNum = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  render() {
    const { year, month, dayOfWeek, dayOfMonth, hour, minute, second } = this.state;

    return (
      <div className="compass-container">
        
        {/* 3. Render year on top left */}
        <div className="corner-tl">{year}</div>

        {/* 3. Render month on bottom right */}
        <div className="corner-br">{this.getMonthName(month)}</div>

        {/* Compass Circle */}
        <div className="compass-face">
            
            {/* 4. Display info in rotated format around the circle */}
            {/* We use CSS transform to place them in a circle */}
            <div className="compass-item" style={{ transform: 'rotate(0deg) translate(140px) rotate(0deg)' }}>
                <span className="label">Day</span>
                <span className="value">{this.getDayName(dayOfWeek)}</span>
            </div>

            <div className="compass-item" style={{ transform: 'rotate(72deg) translate(140px) rotate(-72deg)' }}>
                <span className="label">Date</span>
                <span className="value">{dayOfMonth}</span>
            </div>

            <div className="compass-item" style={{ transform: 'rotate(144deg) translate(140px) rotate(-144deg)' }}>
                <span className="label">Hour</span>
                <span className="value">{this.formatNum(hour)}</span>
            </div>

            <div className="compass-item" style={{ transform: 'rotate(216deg) translate(140px) rotate(-216deg)' }}>
                <span className="label">Min</span>
                <span className="value">{this.formatNum(minute)}</span>
            </div>

            <div className="compass-item" style={{ transform: 'rotate(288deg) translate(140px) rotate(-288deg)' }}>
                <span className="label">Sec</span>
                <span className="value">{this.formatNum(second)}</span>
            </div>

            {/* 4. Linear format in the center */}
            <div className="linear-display">
                <div className="linear-date">{this.getDayName(dayOfWeek)}, {dayOfMonth} {this.getMonthName(month)} {year}</div>
                <div className="linear-time">
                    {this.formatNum(hour)}:{this.formatNum(minute)}:<span className="seconds">{this.formatNum(second)}</span>
                </div>
            </div>

        </div>
      </div>
    );
  }
}

export default Clock;