import './styles.css'
import DayEvent from '../DayEvent/DayEvent';
import TimeSlice from '../TimeSlice/TimeSlice';
import {DAY_WIDTH} from '../../Constants';
import {getHalfHourSlices} from '../../Helpers';

export interface DayEventItemInterface {
    color: string,
    start: Date,
    end: Date
}

export interface DayProps {
    events: Array<DayEventItemInterface>
}

const Day = (props: DayProps) => {
    const { events } = props;

    // we allocate the space by getting the earliest start time
    // and latest end time, then divide it into 30 minute sections
    let minHalfHour: number = 48; // we'll start with 48 since we have 48 half hours in a day
    let maxHalfHour: number = 0;

    events.forEach(({start, end}) => {
        let currentMinHalfHour = getHalfHourSlices(start)
        if(currentMinHalfHour < minHalfHour) {
            minHalfHour = currentMinHalfHour
        }

        let currentMaxHalfHour = getHalfHourSlices(end)
        if(currentMaxHalfHour > maxHalfHour) {
            maxHalfHour = currentMaxHalfHour
        }
    });

    const totalSlices: number = maxHalfHour - minHalfHour;

    let eventsComponents = events.map(({color, start, end}) => { 
        const startOffset: number = (getHalfHourSlices(start) - minHalfHour) * DAY_WIDTH / totalSlices;
        const width: number = (getHalfHourSlices(end) - getHalfHourSlices(start)) * DAY_WIDTH / totalSlices;
        return (
            <DayEvent color={color} start={start} end={end} startOffset={startOffset} width={width} />
        );
    })
    
    let timeSlicesComponents: Array<JSX.Element> = [];

    for(let i = minHalfHour; i < maxHalfHour; i++) {
        let date: Date = new Date();
        date.setHours(Math.floor(i / 2), i % 2 * 30);
        let width = DAY_WIDTH / totalSlices;
        timeSlicesComponents.push(<TimeSlice date={date} width={width} />)
    }

    let today = new Date();
    const todayString = today.toLocaleDateString("en-UK", { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className="day">
            <h2>{todayString}</h2>
            <div className="time-slices-label">
                {timeSlicesComponents}
            </div>
            {eventsComponents}
        </div>
      );
}



export default Day;