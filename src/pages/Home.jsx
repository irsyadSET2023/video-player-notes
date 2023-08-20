import React, { useContext, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useForm } from "react-hook-form";
import { AppContext } from "../App";
import Header from "../components/Header";
import Note from "../components/Note";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const playerRef = useRef(null);

  const { url, notes, setNotes } = useContext(AppContext);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const handleProgress = (progress) => {
    setPlayedSeconds(progress.playedSeconds);
  };

  const handleTimeClick = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  console.log(formatTime(1)); // Output: 00:00:01
  console.log(formatTime(100)); // Output: 00:01:40
  console.log(formatTime(3800)); // Output: 01:03:20

  //   const onDragEnd = (result) => {
  //     if (!result.destination) {
  //       return; // Return if the item was dropped outside of a valid droppable area
  //     }

  //     const updatedNotes = Array.from(notes);
  //     const [reorderedItem] = updatedNotes.splice(result.source.index, 1);
  //     updatedNotes.splice(result.destination.index, 0, reorderedItem);

  //     // Update your state or data source with the new order of notes
  //     // For example, if you're using React state:
  //     setNotes(updatedNotes);
  //   };

  const onSubmit = (data) => {
    setNotes([...notes, { note: data.note, time: playedSeconds }]);
  };
  return (
    <div>
      <Header />
      <div className="flex w-screen h-screen">
        <div className="bg-slate-600 w-[60%] flex flex-col  items-center">
          <h1 className="text-white text-xl mt-5"> Videos</h1>
          <ReactPlayer
            ref={playerRef}
            className="bg-slate-500 rounded-lg shadow-md m-10"
            url={url}
            onProgress={handleProgress}
            controls={true}
          />
          <form className="flex gap-[50px]" onSubmit={handleSubmit(onSubmit)}>
            <button
              className="bg-slate-500 w-[200px] rounded-lg shadow-md"
              type="submit"
            >
              Take Note
            </button>
            <label htmlFor="note" className="sr-only">
              Add Note
            </label>
            <input
              className="w-[300px] border border-blue-300 rounded-lg p-2 focus:outline-none"
              type="text"
              name="note"
              id="note"
              placeholder="Add note"
              {...register("note", { required: true })}
            />
            {errors.note && (
              <div className="text-red-800 text-sm">Note is required</div>
            )}
          </form>
        </div>
        <div className="bg-red-300 w-[40%] flex flex-col justify-start items-center gap-5">
          <h1 className="text-white text-xl mt-5">Notes</h1>
          <h1 className="text-white text-xl">Notes Count:{notes.length}</h1>
          <div
            className="bg-slate-500 rounded-lg w-[60%] h-[400px] flex flex-col items-center overflow-y-scroll p-2"
            style={{
              scrollbarWidth: "thin" /* Width of the vertical scrollbar */,
              scrollbarColor:
                "rgba(255, 255, 255, 0.4) transparent" /* Color of the thumb and track */,
            }}
          >
            {/* <DragDropContext onDragEnd={onDragEnd}> */}
            <DragDropContext>
              <Droppable droppableId="notes-list" direction="vertical">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-2"
                  >
                    {notes.map((element, index) => (
                      <Note
                        key={index}
                        index={index}
                        Time={formatTime(Math.floor(element.time))}
                        Note={element.note}
                        onTimeClick={handleTimeClick}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          {/* <div className="bg-slate-500 rounded-lg w-[60%] h-[400px] flex flex-col items-center overflow-y-scroll ">
            {notes.map((element, index) => (
              <Note
                key={index}
                index={index}
                Time={element.time}
                Note={element.note}
                onTimeClick={handleTimeClick}
              />
            ))}
            notes
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
