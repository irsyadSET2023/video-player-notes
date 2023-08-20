import React from "react";
// import Draggable from "react-draggable";
import { Draggable } from "react-beautiful-dnd";

function parseTime(timeString) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  return hours * 3600 + minutes * 60 + seconds;
}

const Note = ({ index, Time, Note, onTimeClick }) => {
  const handleTimeClick = () => {
    onTimeClick(parseTime(Time));
  };

  return (
    <Draggable draggableId={String(index)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white rounded-lg shadow-md p-3 flex gap-5 cursor-move w-[300px]"
        >
          <div
            className="cursor-pointer text-blue-700"
            onClick={handleTimeClick}
          >
            {Time}
          </div>
          <div>
            <p className=" text-center break-words overflow-wrap w-[200px]">
              {Note}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Note;
