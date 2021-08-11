import './styles.css'
import {COLORS} from '../../Constants';
import {useState} from 'react';
import { DayEventItemInterface } from '../Day/Day';

export interface DayEventAddPropsInterface {
    addEvent: Function
}

const DayEventAdd = ({addEvent}: DayEventAddPropsInterface) => {

    const [selectedColor, setSelectedColor] = useState<string>("blue");
    const [startTime, setStartTime] = useState<string>("00:00");
    const [endTime, setEndTime] = useState<string>("00:00");

    let colorDropdown = Object.keys(COLORS).map((color) => {
        return (
            <option key={color} style={{backgroundColor: COLORS[color]}} value={color}></option>
        )
    })

    const handleColorOnChange = (e:any) => {
        setSelectedColor(e.target.value);
    }

    const handleStartTimeOnChange = (e:any) => {
        setStartTime(e.target.value);
    }

    const handleEndTimeOnChange = (e:any) => {
        setEndTime(e.target.value);
    }

    const handleAdd = () => {
        let start = new Date();
        let startTimeArray = startTime.split(":");
        if(startTimeArray.length === 2) {
            start.setHours(Number.parseInt(startTimeArray[0]), Number.parseInt(startTimeArray[1]))
        }
        let end = new Date();
        let endTimeArray = endTime.split(":");
        if(endTimeArray.length === 2) {
            end.setHours(Number.parseInt(endTimeArray[0]), Number.parseInt(endTimeArray[1]))
        }

        const newEvent: DayEventItemInterface = {
            color: selectedColor,
            start,
            end
        }

        if(!startTime || !endTime) {
            alert("start time or end time cannot be empty")
        }
        else if(newEvent.start.getTime() >= newEvent.end.getTime()) {
            alert("start time cannot be equal or greater than end time")
        }
        else {
            addEvent(newEvent);
        }
    }

    return (
        <div className="day-event-add">
            <div>
                Color:
            </div>
            <div>
                <select className="day-event-add-color-select" style={{backgroundColor: COLORS[selectedColor]}} onChange={handleColorOnChange}>
                        {colorDropdown}
                    </select>
                </div>
            <div>
                Start:
            </div>
            <div>
                <input type="time" value={startTime} onChange={handleStartTimeOnChange}></input>
            </div>
            <div>
                End
            </div>
            <div>
                <input type="time" value={endTime} onChange={handleEndTimeOnChange}></input>
            </div>
            <div>

            </div>
            <div>
                <button onClick={handleAdd}>Add Event</button>
            </div>
        </div>
    )
}

export default DayEventAdd;