import './styles.css'
import DayEvent from '../DayEvent/DayEvent';
import TimeLabel from '../TimeLabel/TimeLabel';
import {DAY_WIDTH} from '../../Constants';
import {getTotalMinutes} from '../../Helpers';

export interface DayEventItemInterface {
    color: string,
    start: Date,
    end: Date
}

export interface DayProps {
    events: Array<DayEventItemInterface>
}

const Day = (props: DayProps) => {
    let { events } = props;

    // sort events by start date
    // if they have the same start date, sort them by duration 
    // longer events gets placed before shorter ones
    events.sort((eventA, eventB) => {
        if (getTotalMinutes(eventA.start) <getTotalMinutes(eventB.start)) {
            return -1;
        }
        else if (getTotalMinutes(eventB.start) < getTotalMinutes(eventA.start)) {
            return 1;
        }
        else {
            if (getTotalMinutes(eventA.end) > getTotalMinutes(eventB.end)) {
                return -1;
            }
            else if (getTotalMinutes(eventB.end) > getTotalMinutes(eventA.end)) {
                return 1;
            }
            else {
                return 0;
            }   
        }
    })

    let minDate = new Date();
    minDate.setHours(23, 59);
    let maxDate = new Date();
    maxDate.setHours(0, 0);

    events.forEach(({start, end}) => {
        if (getTotalMinutes(minDate) > getTotalMinutes(start)){
            minDate = start;
        }

        if (getTotalMinutes(maxDate) < getTotalMinutes(end)){
            maxDate = end;
        }
    })

    const minMinutes = getTotalMinutes(minDate);
    const maxMinutes = getTotalMinutes(maxDate);
    const totalMinuteSpan = maxMinutes - minMinutes;

    // prepare rendering the event components 
    let eventsComponents = events.map(({color, start, end}, index) => { 
        const startOffset: number = (getTotalMinutes(start) - minMinutes) * DAY_WIDTH / totalMinuteSpan;
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
                { events.length > 0 ? <TimeLabel minDate={minDate} maxDate={maxDate} /> : null }
            </div>
            {eventsComponents}
        </div>
      );
}



export default Day;