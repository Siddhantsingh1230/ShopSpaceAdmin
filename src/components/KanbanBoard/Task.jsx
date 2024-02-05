import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

export default function Task({ task, index, columnID, deleteItem }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          initial={{ x: 0, Y: 0 }}
          motion={{ x: 0, Y: 0 }}
          exit={{ x: "-100vw", backgroundColor: "#fff" }}
          transition={{ duration: 1, easings: "ease" }}
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
          } rounded-md mb-5 max-sm:mb-3 md:grid md:grid-cols-11 px-2 py-3 max-sm:py-1 max-sm:pb-3 max-sm:px-0 max-sm:flex max-sm:flex-col-reverse  `}
        >
          <div className="md:col-span-1 pl-2 max-sm:hidden">
            <i className="ri-draggable text-black"></i>
          </div>
          <div className="md:col-span-9 text-sm max-sm:text-xs max-sm:px-2 ">
            {task.title}
          </div>
          <div
            onClick={() => deleteItem(columnID, task.id)}
            title="delete"
            className="md:col-span-1 text-xl cursor-pointer max-sm:self-end max-sm:pr-1"
          >
            <i className="ri-close-fill"></i>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
}
