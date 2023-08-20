// Home.js
import React, { useContext, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useForm } from "react-hook-form";
import { AppContext } from "../App";
import Header from "../components/Header";
import Note from "../components/Note";

const Home2 = () => {
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

  const handleNoteReorder = (dragIndex, hoverIndex) => {
    const newNotes = [...notes];
    const draggedNote = newNotes[dragIndex];
    newNotes.splice(dragIndex, 1);
    newNotes.splice(hoverIndex, 0, draggedNote);
    setNotes(newNotes);
  };

  const onSubmit = (data) => {
    setNotes([...notes, { note: data.note, time: playedSeconds }]);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Header />
      <div className="mt-6 flex justify-center">
        <ReactPlayer
          ref={playerRef}
          className="bg-slate-500 rounded-lg shadow-md"
          url={url}
          onProgress={handleProgress}
          controls={true}
        />
      </div>
      <div className="flex mt-2 justify-center">
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
      <div className="flex flex-col justify-center mt-6 items-center">
        {notes.map((element, index) => (
          <Note
            key={index}
            index={index}
            Time={element.time}
            Note={element.note}
            onTimeClick={handleTimeClick}
            onNoteReorder={handleNoteReorder}
          />
        ))}
      </div>
    </div>
  );
};

export default Home2;
