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
          className="bg-white rounded-lg shadow-md p-3 flex gap-5 cursor-move "
        >
          <div
            className="cursor-pointer text-blue-700"
            onClick={handleTimeClick}
          >
            {Time}
          </div>
          <div>{Note}</div>
        </div>
      )}
    </Draggable>
  );

  //   return (
  //     <Draggable>
  //       <div className="bg-green-500 rounded-lg shadow-md p-3 flex gap-5 cursor-move w-[80%]">
  //         <div className="cursor-pointer" onClick={handleTimeClick}>
  //           {Time}s
  //         </div>
  //         <div>{Note}</div>
  //       </div>
  //     </Draggable>
  //   );
};

export default Note;
