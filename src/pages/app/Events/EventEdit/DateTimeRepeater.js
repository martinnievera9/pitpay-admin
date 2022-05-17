
import moment from 'moment';
import React, { useEffect } from 'react';
// import { Button, RemoveButton } from 'components/Button';
import { DatePicker } from 'components/Form/DatePicker';
import { ErrorText } from 'components/Form/styles';
import Spacer from 'components/Spacer';
import { SectionTitle } from '../AddEvents/styles';
import { Heading } from '../CancelModal/style';


const DateSection = ({ handleChange, date, index, handleDelete }) => {

  return (
    <div>
      {/* <RemoveButton
        style={{ marginBottom: 20, marginTop: 20 }}
        onClick={handleDelete}
      /> */}
      <div style={{ display:'flex'}}>
        <div style={{ margin:20 }}>
          <Heading>{moment(date.event_date).format('ddd MMM DD')}</Heading>
          {/* <input type="hidden" value="04-19-2022" name={`event_date_${index}`}/>
          
          <DatePicker
          name={`event_date_${index}`}
          type="date"
          label="Date"
          value={date.event_date}
          onChange={(_, value) =>
            handleChange({ target: { name: 'event_date', value } })
          }
        /> */}
        </div>
        <div style={{ margin: 10 }}>
          <DatePicker
            id={`gate_time_${index}`}
            name={`gate_time_${index}`}
            type="time"
            label={`Pit Gate Time`}
            value={date.gate_time}
            onChange={(_, event) => {
              handleChange({
                target: { name: 'gate_time', value: event.target.value },
              });
            }}
          />
        </div>
        <div style={{ margin: 10 }}>
          <DatePicker
            id={`start_time_${index}`}
            name={`start_time_${index}`}
            type="time"
            label={`Race Start Time`}
            value={date.start_time}
            onChange={(_, event) => {
              handleChange({
                target: { name: 'start_time', value: event.target.value },
              });
            }}
          />
        </div>
      </div>

      <Spacer size={18} />
    </div>
  );
};

const DateTimeRepeater = ({ dates, onChange, error, eventSD, eventED }) => {

  // const getDaysArray = function(start, end) {
  //   for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
  //         console.log(dt);
  //       arr.push(dt);
  //   }
  //   return arr;
  // };
  // const daylist = getDaysArray((eventSD),(eventED));

  useEffect(() => {
    const date1 = new Date(eventSD);
    const date2 = new Date(eventED);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1; 

    
    dates = [];
    let date = new Date(eventSD);
    for(var i = 0; i<diffDays-1; i++)
    {
      dates.push({ event_date:  moment(date).format('MM-DD-YYYY')});
      date = new Date(date.setDate(date.getDate() + 1));
    }
    if(eventED)
      onChange([...dates, { event_date: eventED ? (moment(new Date(eventED)).format('MM-DD-YYYY')) : '' }]);

  }, [eventSD, eventED]);
  return (
    <div>
      <SectionTitle>Gate and Start Times</SectionTitle>
      {dates.map((date, index) => (
        <DateSection
          date={date}
          index={index}
          key={index}
          handleDelete={() => {
            const newDates = dates.filter(
              (_, currentIndex) => currentIndex !== index
            );
            onChange(newDates);
          }}
          handleChange={({ target }) => {
            const newDates = dates.map((date, currentIndex) =>
              currentIndex === index
                ? { ...date, [target.name]: target.value }
                : date
            );
            onChange(newDates);
          }}
        />
      ))}
      {error && (
        <ErrorText fontSize={16} style={{ marginBottom: 20 }}>
          {error}
        </ErrorText>
      )}
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'space-content',
        }}
      >
        <Button
          type="button"
          style={{ marginRight: 20 }}
          onClick={() => {
            onChange([...dates, { event_date: '' }]);
          }}
        >
          Add a date and time
        </Button>
      </div> */}
    </div>
  );
};

export default DateTimeRepeater;
