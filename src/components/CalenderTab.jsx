import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import CalenderModal from "./CalenderModal";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getCalender, updateEvent } from "../api/calender";
import Spinner from "./Spinner";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalenderTab = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // Fetch Calender
  const fetchCalender = async () => {
    try {
      let { calender } = await getCalender(user._id);
      calender = calender.map((item, key) => ({
        ...item,
        start: new Date(item.start),
        end: new Date(item.end),
      }));
      setMyEvents(calender);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalender();
  }, []);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing =
          prev.find((ev) => ev.createdAt === event.createdAt) ?? {};
        const filtered = prev.filter((ev) => ev.createdAt !== event.createdAt);
        // updateEvent
        updateEvent(existing._id, { start, end });
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMyEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing =
          prev.find((ev) => ev.createdAt === event.createdAt) ?? {};
        const filtered = prev.filter((ev) => ev.createdAt !== event.createdAt);
        updateEvent(existing._id, { start, end });
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );
  const defaultDate = useMemo(() => new Date(), []);
  return (
    <>
      {!loading ? (
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
      ) : (
        <Spinner />
      )}
      {/* calander modal */}
      <CalenderModal open={open} setOpen={setOpen} setEvents={setMyEvents} />
    </>
  );
};

export default CalenderTab;
