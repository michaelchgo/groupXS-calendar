import './styles.css'
import Day from '../Day/Day'
import { DayEventItemInterface } from '../Day/Day'

const Calendar = () => {

    let blueStart = new Date();
    blueStart.setHours(9, 0);
    let blueEnd = new Date();
    blueEnd.setHours(15, 30);

    let greenStart = new Date();
    greenStart.setHours(9, 0);
    let greenEnd = new Date();
    greenEnd.setHours(14, 30);

    let brownStart = new Date();
    brownStart.setHours(9, 30);
    let brownEnd = new Date();
    brownEnd.setHours(11, 30);

    let redStart = new Date();
    redStart.setHours(11, 30);
    let redEnd = new Date();
    redEnd.setHours(12, 0);

    let orangeStart = new Date();
    orangeStart.setHours(14, 30);
    let orangeEnd = new Date();
    orangeEnd.setHours(15, 0);

    let yellowStart = new Date();
    yellowStart.setHours(15, 30);
    let yellowEnd = new Date();
    yellowEnd.setHours(16, 0);

    const events: Array<DayEventItemInterface> = [
      {
        color: "blue",
        start: blueStart,
        end: blueEnd
      },
      {
        color: "green",
        start: greenStart,
        end: greenEnd
      },
      {
        color: "brown",
        start: brownStart,
        end: brownEnd
      },
      {
        color: "red",
        start: redStart,
        end: redEnd
      },
      {
        color: "orange",
        start: orangeStart,
        end: orangeEnd
      },
      {
        color: "yellow",
        start: yellowStart,
        end: yellowEnd
      },
    ]

    // for now only has one day component as specified in the requirements
    // but made a "calendar" component still so that if multiple days were required
    // it can be accommodated
    return (
        <div className="calendar">
          <Day events={events}/>
        </div>
      );
}

export default Calendar