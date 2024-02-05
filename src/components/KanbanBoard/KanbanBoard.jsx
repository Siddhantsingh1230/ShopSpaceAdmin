import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useSelector } from "react-redux";
import {
  addNote,
  deleteNote,
  getAllNotes,
  updateNoteCategory,
} from "../../api/notes";

export default function KanbanBoard() {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState([]);
  const getNotes = async (userId) => {
    try {
      const { notes } = await getAllNotes(userId);
      setData(notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotes(user?._id);
  }, []);

  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [backlogs, setBacklogs] = useState([]);

  useEffect(() => {
    setTasks(data.filter((item) => item.category === "task"));
    setReports(data.filter((item) => item.category === "report"));
    setBacklogs(data.filter((item) => item.category === "backlog"));
  }, [data]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // console.log(destination, "-", source, "-", draggableId);
    if (destination === null || source === null) return;
    let dstIndex = destination.index;
    let srcIndex = source.index;
    if (source.droppableId === destination.droppableId) {
      let tempArray =
        source.droppableId == "1"
          ? tasks
          : source.droppableId == "2"
          ? reports
          : backlogs;
      if (
        srcIndex < 0 ||
        srcIndex >= tempArray.length ||
        dstIndex < 0 ||
        dstIndex >= tempArray.length
      ) {
        console.error("Invalid indices provided for swapping.");
        return; // Return the original array if indices are invalid
      }

      // Swap the items using a temporary variable
      const temp = tempArray[srcIndex];
      tempArray[srcIndex] = tempArray[dstIndex];
      tempArray[dstIndex] = temp;

      switch (source.droppableId) {
        case "1":
          setTasks(tempArray);
          break;
        case "2":
          setReports(tempArray);
          break;
        case "3":
          setBacklogs(tempArray);
          break;
      }
      return;
    }

    // Remove from source array
    if (source.droppableId === "1") {
      setTasks(removeItemById(draggableId, tasks));
    } else if (source.droppableId === "2") {
      setReports(removeItemById(draggableId, reports));
    } else if (source.droppableId === "3") {
      setBacklogs(removeItemById(draggableId, backlogs));
    }

    // Get item
    const taskItem = findItemById(draggableId, [
      ...tasks,
      ...reports,
      ...backlogs,
    ]);

    // Add item
    if (destination.droppableId === "1") {
      const tempArray = tasks;
      tempArray.splice(dstIndex, 0, { ...taskItem, category: "tasks" });
      setTasks(tempArray);
      updateNote(taskItem._id, "task");
    } else if (destination.droppableId === "2") {
      const tempArray = reports;
      tempArray.splice(dstIndex, 0, { ...taskItem, category: "tasks" });
      setReports(tempArray);
      updateNote(taskItem._id, "report");
    } else if (destination.droppableId === "3") {
      const tempArray = backlogs;
      tempArray.splice(dstIndex, 0, { ...taskItem, category: "tasks" });
      setBacklogs(tempArray);
      updateNote(taskItem._id, "backlog");
    }
  };

  const findItemById = (id, array) => {
    return array.find((item) => item.createdAt == id);
  };

  const removeItemById = (id, array) => {
    return array.filter((item) => item.createdAt != id);
  };

  const deleteItem = (columnId, id, taskId) => {
    // console.log(columnId, "-", id);
    let temp;
    switch (columnId) {
      case "1":
        temp = tasks;
        temp = temp.filter((item) => item.createdAt != id);
        setTasks(temp);
        deleteFromDB(taskId);
        break;
      case "2":
        temp = reports;
        temp = temp.filter((item) => item.createdAt != id);
        setReports(temp);
        deleteFromDB(taskId);
        break;
      case "3":
        temp = backlogs;
        temp = temp.filter((item) => item.createdAt != id);
        setBacklogs(temp);
        deleteFromDB(taskId);
        break;
    }
  };
  const addItem = (columnId, title) => {
    // console.log(columnId, "-", id);
    let createdAt;
    switch (columnId) {
      case "1":
        createdAt = Date.now();
        addToDB(createdAt, "task", title);
        setTasks([...tasks, { category: "task", title, createdAt }]);
        break;
      case "2":
        createdAt = Date.now();
        addToDB(createdAt, "report", title);
        setReports([...reports, { category: "report", title, createdAt }]);
        break;
      case "3":
        createdAt = Date.now();
        addToDB(createdAt, "backlog", title);
        setBacklogs([...backlogs, { category: "backlog", title, createdAt }]);
        break;
    }
  };
  // DB methods
  const addToDB = async (createdAt, category, title) => {
    try {
      await addNote(title, user._id, category, createdAt);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFromDB = async (id) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.log(error);
    }
  };
  const updateNote = async (id, category) => {
    try {
      await updateNoteCategory(id, category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5 w-full h-full overflow-y-auto max-sm:gap-2">
          <Column
            title={"TASKS"}
            tasks={tasks}
            id={"1"}
            deleteItem={deleteItem}
            addItem={addItem}
          />
          <Column
            title={"REPORTS"}
            tasks={reports}
            id={"2"}
            deleteItem={deleteItem}
            addItem={addItem}
          />
          <Column
            title={"BACKLOGS"}
            tasks={backlogs}
            id={"3"}
            deleteItem={deleteItem}
            addItem={addItem}
          />
        </div>
      </DragDropContext>
    </>
  );
}
