import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index, columnID }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging.toString()}
          className={`select-none ${
            columnID == "1"
              ? "bg-[#8f5af1] "
              : columnID == "2"
              ? "bg-[#e49771] "
              : "bg-[#fa51e3] "
          } rounded-md mb-5 grid grid-cols-11 px-2 py-3 `}
        >
          <div className="col-span-1 pl-2"><i className="ri-draggable text-black"></i></div>
          <div className="col-span-9 text-sm ">{task.title}</div>
          <div title="delete" className="col-span-1 text-xl cursor-pointer "><i className="ri-close-fill"></i></div>
        </div>
      )}
    </Draggable>
  );
}
