import { useState } from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import "./scroll.css";
import AddModal from "./AddModal";

export default function Column({ title, tasks, id, deleteItem, addItem }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div
        className={`column bg-[#181818] flex-1 h-[95%] overflow-y-auto w-full`}
      >
        <div
          className={`p-3 w-full flex items-center justify-between bg-[#262626] sticky top-0 rounded-b-md ${
            id == "1"
              ? "text-[#9C6DF3] "
              : id == "2"
              ? "text-[#EB7D44] "
              : "text-[#f91ff6] "
          } max-sm:text-xs  `}
        >
          <h3
            className={` select-none max-w-32 overflow-hidden text-nowrap text-ellipsis`}
          >
            {id == "1" ? (
              <i className="ri-draft-line"></i>
            ) : id == "2" ? (
              <i className="ri-flag-2-line"></i>
            ) : (
              <i className="ri-archive-stack-line"></i>
            )}{" "}
            {title}
          </h3>
          <i
            onClick={() => setOpenModal(true)}
            title="add"
            className=" cursor-pointer max-sm:text-xs text-xl ri-add-fill"
          ></i>
        </div>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              className={`flex flex-col py-5  px-2 max-sm:px-0`}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isdraggingover={snapshot.isDraggingOver.toString()}
            >
              {tasks.map((task, index) => (
                <Task
                  key={index}
                  index={index}
                  task={task}
                  columnID={id}
                  deleteItem={deleteItem}
                />
              ))}
            </div>
          )}
        </Droppable>
      </div>
      {/* Modal */}
      <AddModal
        open={openModal}
        setOpen={setOpenModal}
        id={id}
        addItem={addItem}
      />
    </>
  );
}
