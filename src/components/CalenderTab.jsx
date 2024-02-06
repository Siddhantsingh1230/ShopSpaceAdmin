import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import CalenderModal from "./CalenderModal";
import { motion } from "framer-motion";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalenderTab = () => {
  const events = [
    {
      id: 0,
      title: "All Day Event very long title",

      start: new Date(2024, 1, 0),
      end: new Date(2024, 1, 1),
    },
    {
      id: 1,
      title: "Long Event",
      start: new Date(2024, 1, 7),
      end: new Date(2024, 1, 10),
    },

    {
      id: 2,
      title: "DTS STARTS",
      start: new Date(2024, 1, 13, 0, 0, 0),
      end: new Date(2024, 1, 20, 0, 0, 0),
    },

    {
      id: 3,
      title: "DTS ENDS",
      start: new Date(2024, 12, 6, 0, 0, 0),
      end: new Date(2024, 12, 13, 0, 0, 0),
    },

    {
      id: 4,
      title: "Some Event",
      start: new Date(2024, 1, 9, 0, 0, 0),
      end: new Date(2024, 1, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: "Conference",
      start: new Date(2024, 1, 11),
      end: new Date(2024, 1, 13),
      desc: "Big conference for important people",
    },
    {
      id: 6,
      title: "Meeting",
      start: new Date(2024, 1, 12, 10, 30, 0, 0),
      end: new Date(2024, 1, 12, 12, 30, 0, 0),
      desc: "Pre-meeting meeting, to prepare for the meeting",
    },
    {
      id: 7,
      title: "Lunch",
      start: new Date(2024, 1, 12, 12, 0, 0, 0),
      end: new Date(2024, 1, 12, 13, 0, 0, 0),
      desc: "Power lunch",
    },
    {
      id: 8,
      title: "Meeting",
      start: new Date(2024, 1, 12, 14, 0, 0, 0),
      end: new Date(2024, 1, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: "Happy Hour",
      start: new Date(2024, 1, 12, 17, 0, 0, 0),
      end: new Date(2024, 1, 12, 17, 30, 0, 0),
      desc: "Most important meal of the day",
    },
    {
      id: 10,
      title: "Dinner",
      start: new Date(2024, 1, 12, 20, 0, 0, 0),
      end: new Date(2024, 1, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: "Planning Meeting with Paige",
      start: new Date(2024, 1, 13, 8, 0, 0),
      end: new Date(2024, 1, 13, 10, 30, 0),
    },
  ];
  const [myEvents, setMyEvents] = useState(events);
  const [open, setOpen] = useState(false);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMyEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );
  const defaultDate = useMemo(() => new Date(2024, 1, 12), []);
  return (
    <>
      <div className="h-full w-full relative">
        <DnDCalendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          localizer={localizer}
          onEventDrop={moveEvent}
          handleDragStart={() => {
            return;
          }}
          onEventResize={resizeEvent}
          popup
          resizable
          style={{ height: "100%", w: "100%" }}
        />
        <motion.button
          initial={{ x: 0, y: 0 }}
          animate={{ y: [5, -5], x: [2, -5] }}
          whileHover={{ rotateZ: 360 }}
          transition={{
            duration: 2,
            ease: "easeIn",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          title="Add event"
          onClick={() => setOpen(true)}
          className="absolute text-lg top-3 hover:bg-blue-500 transition-all left-[35%] rounded-full bg-green-300 font-bold   max-sm:top-10 max-sm:left-5 cursor-pointer w-7 h-7 "
        >
          <i className="ri-add-line"></i>
        </motion.button>
      </div>
      {/* calander modal */}
      <CalenderModal open={open} setOpen={setOpen} />
    </>
  );
};

export default CalenderTab;
