import React from 'react';
import { connect } from 'react-redux';
import { setDate } from '../redux/taskActions';

const Calendar = ({ selectedDate, setDate }) => {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <label htmlFor="date-picker" style={{ marginRight: '10px', fontWeight: 'bold' }}>
        Select Day:
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: '5px', fontSize: '16px' }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedDate: state.planner.selectedDate,
});

const mapDispatchToProps = (dispatch) => ({
  setDate: (date) => dispatch(setDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);