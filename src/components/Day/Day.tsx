import './styles.css'
import DayEvent from '../DayEvent/DayEvent';
import TimeSlice from '../TimeSlice/TimeSlice';
import {DAY_WIDTH} from '../../Constants';
import {getHalfHourSlicesCeil, getHalfHourSlicesFloor, getTotalMinutes} from '../../Helpers';

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

    // we allocate the space by getting the 
    // earliest start time nd latest end time
    // for the labels, we divide it into 30 minute sections
    let minHalfHour: number = 48; // we'll start with 48 since we have 48 half hours in a day
    let maxHalfHour: number = 0;

    events.forEach(({start, end}) => {
        let currentMinHalfHour = getHalfHourSlicesFloor(start)
        if(currentMinHalfHour < minHalfHour) {
            minHalfHour = currentMinHalfHour
        }

        let currentMaxHalfHour = getHalfHourSlicesCeil(end)
        if(currentMaxHalfHour > maxHalfHour) {
            maxHalfHour = currentMaxHalfHour
        }
    });

    let totalSlices: number = maxHalfHour - minHalfHour;
    totalSlices = totalSlices === 0 ? 1 : totalSlices
    
    // prepare rendering the time slice labels on top
    let timeSlicesComponents: Array<JSX.Element> = [];
    // default interval is 30 minutes
    let timeSliceHalfHourIntervals = 1;
    // if the total timespan of all events is more than 12 hours
    // the interval of the labels would be 2 hours
    if (totalSlices > 24) {
        timeSliceHalfHourIntervals = 4;
    }
    // if the total timespan of all events is more than 6 hours
    // the interval of the labels would be 1 hour
    else if (totalSlices > 12) {
        timeSliceHalfHourIntervals = 2;
    }

    // we add the modulo of the intervals to the total slices
    // so we can get the accurate position of the events
    totalSlices += totalSlices % timeSliceHalfHourIntervals;

    let totalMinuteSpan: number = totalSlices * 30;
    totalMinuteSpan = totalMinuteSpan === 0 ? 1 : totalMinuteSpan

    for(let i = minHalfHour; i < maxHalfHour; i+=timeSliceHalfHourIntervals) {
        let date: Date = new Date();
        date.setHours(Math.floor(i / 2), i % 2 * 30);
        let width = DAY_WIDTH / (totalSlices / timeSliceHalfHourIntervals);
        timeSlicesComponents.push(<TimeSlice key={i} date={date} width={width} />)
    }

    // prepare rendering the event components 
    let eventsComponents = events.map(({color, start, end}, index) => { 
        const startOffset: number = (getTotalMinutes(start) - minHalfHour * 30) * DAY_WIDTH / totalMinuteSpan;
        const width: number = (getTotalMinutes(end) - getTotalMinutes(start)) * DAY_WIDTH / totalMinuteSpan;
        return (
            <DayEvent key={index} color={color} start={start} end={end} startOffset={startOffset} width={width} />
        );
    })
    

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