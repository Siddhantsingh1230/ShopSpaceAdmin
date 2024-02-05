import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import "./scroll.css";



export default function Column({ title, tasks, id }) {
  return (
    <div
      className={`column bg-[#181818] flex-1 h-[95%] overflow-y-auto w-full`}
    >
      <div className={`p-3 w-full flex justify-between bg-[#262626] sticky top-0 rounded-b-md ${
          id == "1"
            ? "text-[#9C6DF3] "
            : id == "2"
            ? "text-[#EB7D44] "
            : "text-[#f91ff6] "
        }`}>
      <h3
        className={` select-none`}
      >
        {id=="1"?<i className="ri-draft-line"></i>:id=="2"?<i className="ri-flag-2-line"></i>:<i className="ri-archive-stack-line"></i>} {title}
      </h3>
      <i title="add" className=" cursor-pointer text-xl ri-add-fill"></i>
      </div>
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
