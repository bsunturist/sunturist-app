import ScheduleItem from "./ScheduleItem";
import "./Schedule.css";

function ScheduleColumn({
    items,
    onRemove
}) {

    return (

        <div className="schedule-column">
          
            {items.map((item,index) => (

                <ScheduleItem
                    key={`${item.id}-${index}`}
                    item={item}
                    index={index}
                    onRemove={onRemove}
                />

            ))}

        </div>
    );
}

export default ScheduleColumn;