import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import "./scroll.css";



export default function Column({ title, tasks, id }) {
  return (
    <div
      className={`column bg-[#181818] flex-1 h-[95%] overflow-y-auto w-full`}
    >
      <h3
        className={`p-3 text-white ${
          id == "1"
            ? "text-[#9C6DF3] "
            : id == "2"
            ? "text-[#EB7D44] "
            : "text-[#f91ff6] "
        } sticky top-0 bg-[#262626] select-none`}
      >
        {title}
      </h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`flex flex-col py-5 px-2`}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} columnID={id} />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}
