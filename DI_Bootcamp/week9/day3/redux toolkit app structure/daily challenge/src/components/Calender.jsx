

const Calendar = ({ selectedDate, onDateChange }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '5px' }}>
      <label htmlFor="date-picker" style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}>
        Select Date:
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        style={{ padding: '5px', fontSize: '16px' }}
      />
    </div>
  );
};

export default Calendar;