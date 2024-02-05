import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function KanbanBoard() {
  const data = [
    {
      id: 8,
      title: "quo adipisci enim quam ut ab",
      category: "task",
    },

    {
      id: 10,
      title: "illo est ratione doloremque quia maiores aut",
      category: "report",
    },

    {
      id: 11,
      title: "vero rerum temporibus dolor",
      category: "report",
    },

    {
      id: 12,
      title: "ipsa repellendus fugit nisi",
      category: "task",
    },

    {
      id: 14,
      title: "repellendus sunt dolores architecto voluptatum",
      category: "backlog",
    },
    ,
    {
      id: 15,
      title: "ab voluptatum amet voluptas",
      category: "report",
    },

    {
      id: 16,
      title: "accusamus eos facilis sint et aut voluptatem",
      category: "task",
    },

    {
      id: 17,
      title: "quo laboriosam deleniti aut qui",
      category: "backlog",
    },

    {
      id: 19,
      title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
      category: "backlog",
    },

    {
      id: 20,
      title: "ullam nobis libero sapiente ad optio sint",
      category: "task",
    },
  ];

  const [tasks, setTasks] = useState([]);
  const [reports, setReports] = useState([]);
  const [backlogs, setBacklogs] = useState([]);
  useEffect(() => {
    setTasks(data.filter((item) => item.category === "task"));
    setReports(data.filter((item) => item.category === "report"));
    setBacklogs(data.filter((item) => item.category === "backlog"));
  }, []);

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
    } else if (destination.droppableId === "2") {
      const tempArray = reports;
      tempArray.splice(dstIndex, 0, { ...taskItem, category: "tasks" });
      setReports(tempArray);
    } else if (destination.droppableId === "3") {
      const tempArray = backlogs;
      tempArray.splice(dstIndex, 0, { ...taskItem, category: "tasks" });
      setBacklogs(tempArray);
    }
  };

  const findItemById = (id, array) => {
    return array.find((item) => item.id == id);
  };

  const removeItemById = (id, array) => {
    return array.filter((item) => item.id != id);
  };

  const deleteItem = (columnId, id) => {
    // console.log(columnId, "-", id);
    let temp;
    switch (columnId) {
      case "1":
        temp = tasks;
        temp = temp.filter((item) => item.id != id);
        setTasks(temp);
        break;
      case "2":
        temp = reports;
        temp = temp.filter((item) => item.id != id);
        setReports(temp);
        break;
      case "3":
        temp = backlogs;
        temp = temp.filter((item) => item.id != id);
        setBacklogs(temp);
        break;
    }
  };
  const addItem = (columnId, title) => {
    // console.log(columnId, "-", id);
    switch (columnId) {
      case "1":
        setTasks([...tasks, { category: "task", title, id: Date.now() }]);
        break;
      case "2":
        setReports([...reports, { category: "report", title, id: Date.now() }]);
        break;
      case "3":
        setBacklogs([
          ...backlogs,
          { category: "backlog", title, id: Date.now() },
        ]);
        break;
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
