import {
    useSortable
} from "@dnd-kit/sortable";

import {
    CSS
} from "@dnd-kit/utilities";

import "./Schedule.css";

function ScheduleItem({
    item,
    index,
    onRemove
}) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: item.id
    });

    const style = {

        transform:
            CSS.Transform.toString(
                transform
            ),

        transition
    };

    return (

        /*<div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="schedule-item"
        >
            <div className="schedule-item-content">

                <div>

                    <strong>
                        Day {index + 1}
                    </strong>

                    <div className="schedule-item-name">

                        {
                            item.accommodationName ||
                            item.activityName ||
                            item.name
                        }

                    </div>

                </div>

                <button
                    type="button"
                    className="remove-schedule-btn"
                    onClick={(e) => {

                        e.stopPropagation();                     

                        onRemove(index);
                    }}
                >
                    ×
                </button>

            </div>

        </div>*/

        <div
            ref={setNodeRef}
            style={style}
            className="schedule-item"
        >

            <div className="schedule-item-content">

                <div className="schedule-left">

                    <div
                        className="drag-handle"
                        {...attributes}
                        {...listeners}
                    >
                        ☰
                    </div>

                    <div>

                        <strong>
                            Day {index + 1}
                        </strong>

                        <div className="schedule-item-name">

                            {
                                item.accommodationName ||
                                item.activityName ||
                                item.name
                            }

                        </div>

                    </div>

                </div>

                <button
                    type="button"
                    className="remove-schedule-btn"
                    onClick={(e) => {

                        e.stopPropagation();

                        console.log("REMOVE CLICKED");

                        onRemove(index);
                    }}
                >
                    ×
                </button>

            </div>

        </div>
    );
}

export default ScheduleItem;