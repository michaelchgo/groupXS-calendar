import './styles.css'
import Day from '../Day/Day'
import { DayEventItemInterface } from '../Day/Day'
import DayEventAdd from '../DayEventAdd/DayEventAdd';
import {useState} from 'react';

const Calendar = () => {
    const [events, setEvents] = useState<Array<DayEventItemInterface>>([])

    const addEvent = (event: DayEventItemInterface) => {
      setEvents([...events, event]);
    }

    // for now only has one day component as specified in the requirements
    // but made a "calendar" component still so that if multiple days were required
    // it can be accommodated
    return (
      <div className="calendar-container">
        <div className="calendar">
          <Day events={events}/>
          <DayEventAdd addEvent={addEvent}/>
        </div>
      </div>
      );
}

export default Calendar