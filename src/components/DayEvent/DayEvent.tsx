import './styles.css'
import {COLORS} from '../../Constants';
import {padZero} from '../../Helpers';

export interface DayEventRenderInterface {
    color: string,
    start: Date,
    end: Date,
    startOffset: number,
    width: number
}

const DayEvent = (props: DayEventRenderInterface) => {

    const {color, start, end, startOffset, width} = props;

    const startHourString = padZero(start.getHours());
    const startMinutesString = padZero(start.getMinutes());

    const endHourString = padZero(end.getHours());
    const endMinutesString = padZero(end.getMinutes());

    return (
        <div className="day-event" style={{backgroundColor: COLORS[color], marginLeft: startOffset, width: width}} title={`${startHourString}:${startMinutesString} - ${endHourString}:${endMinutesString}`} />
      );
}


export default DayEvent;