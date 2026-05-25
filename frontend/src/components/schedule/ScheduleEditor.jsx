import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import ScheduleColumn from "./ScheduleColumn";

import "./Schedule.css";

function ScheduleEditor({
    type,
    availableItems,
    scheduledItems,
    setScheduledItems
}) {

    const handleDragEnd = (event) => {

        const {active, over} = event;

        if (!over) return;

        if (
            active.id !== over.id
        ) {

            const oldIndex =
                scheduledItems.findIndex(
                    item => item.id === active.id
                );

            const newIndex =
                scheduledItems.findIndex(
                    item => item.id === over.id
                );

            if (
                oldIndex !== -1 &&
                newIndex !== -1
            ) {

                setScheduledItems(
                    arrayMove(
                        scheduledItems,
                        oldIndex,
                        newIndex
                    )
                );
            }
        }
    };

    const removeFromSchedule = (indexToRemove) => {
        
        setScheduledItems(prev =>
            prev.filter(
                (_,index) =>
                    index !== indexToRemove
            )
        );
    };

    const addToSchedule = (item) => {

        const exists =
        scheduledItems.some(i =>
            type === "accommodation"
                ? i.accommodationId === item.id
                : i.activityId === item.id
        );

        if (exists) return;

        const newItem =
            type === "accommodation"
            ? {
                id: null,
                accommodationId: item.id,
                accommodationName: item.name,
                defaultDays: item.defaultDays,
                dayOrder: scheduledItems.length
            }
            : {
                id: null,
                activityId: item.id,
                activityName: item.name,
                defaultDays: item.defaultDays,
                dayOrder: scheduledItems.length
            };

        setScheduledItems(prev => [
            ...prev,
            newItem
        ]);
    };

    return (
        
        
        <DndContext
            collisionDetection={
                closestCenter
            }
            onDragEnd={handleDragEnd}
        >

            <div className="schedule-editor">

                {/* LEFT SIDE */}

                <div className="schedule-side">

                    <h3>
                        Tour Schedule
                    </h3>

                    <SortableContext
                        items={
                            scheduledItems
                        }
                        strategy={
                            verticalListSortingStrategy
                        }
                    >

                        <ScheduleColumn
                            items={
                                scheduledItems
                            }

                            onRemove={removeFromSchedule}
                        />

                    </SortableContext>

                </div>

                {/* RIGHT SIDE */}

                <div className="available-side">

                    <h3>
                        Available Items
                    </h3>

                    {availableItems.map(item => (

                        <div
                            key={item.id}
                            className="available-item"
                        >

                            <span>
                                {item.name}
                            </span>

                            <button
                                onClick={() =>
                                    addToSchedule(item)
                                }
                            type="button">
                                Add
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </DndContext>
    );
}

export default ScheduleEditor;