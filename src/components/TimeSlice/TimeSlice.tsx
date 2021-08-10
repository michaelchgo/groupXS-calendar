import './styles.css'
import {padZero} from '../../Helpers';

export interface TimeSliceInterface {
    date: Date,
    width: number
}

//this component is simply used as a label on top of the events
const TimeSlice = ({date, width}: TimeSliceInterface) => {

    const startHourString = padZero(date.getHours());
    const startMinutesString = padZero(date.getMinutes());

    return (
        <div style={{width: width}} className="time-slice">
            {`${startHourString}:${startMinutesString}`}
        </div>
    )
   
}

export default TimeSlice;