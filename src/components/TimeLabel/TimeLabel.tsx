import './styles.css'
import {padZero} from '../../Helpers';

export interface TimeSliceInterface {
    minDate: Date,
    maxDate: Date
}

//this component is simply used as a label on top of the events
const TimeLabel = ({minDate, maxDate}: TimeSliceInterface) => {

    const minHourString = padZero(minDate.getHours());
    const minMinutesString = padZero(minDate.getMinutes());

    const maxHourString = padZero(maxDate.getHours());
    const maxMinutesString = padZero(maxDate.getMinutes());

    return (
        <div className="time-label-container">
            <div className="time-label time-label-start">
                {`${minHourString}:${minMinutesString}`}
            </div>
            <div className="time-label time-label-end">
                {`${maxHourString}:${maxMinutesString}`}
            </div>
        </div>
    )
   
}

export default TimeLabel;