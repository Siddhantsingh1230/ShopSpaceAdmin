import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalenderTab = () => {
  const events = [
    {
      id: 0,
      title: "All Day Event very long title",
      allDay: true,
      start: new Date(2024, 1, 0),
      end: new Date(2024, 1, 1),
    },
    {
      id: 1,
      title: "Long Event",
      start: new Date(2024, 1, 7),
      end: new Date(2024, 1, 10),
      allDay: false,
    },

    {
      id: 2,
      title: "DTS STARTS",
      start: new Date(2024, 1, 13, 0, 0, 0),
      end: new Date(2024, 1, 20, 0, 0, 0),
      allDay: false,
    },

    {
      id: 3,
      title: "DTS ENDS",
      start: new Date(2024, 12, 6, 0, 0, 0),
      end: new Date(2024, 12, 13, 0, 0, 0),
      allDay: false,
    },

    {
      id: 4,
      title: "Some Event",
      start: new Date(2024, 1, 9, 0, 0, 0),
      end: new Date(2024, 1, 10, 0, 0, 0),
      allDay: false,
    },
    {
      id: 5,
      title: "Conference",
      start: new Date(2024, 1, 11),
      end: new Date(2024, 1, 13),
      desc: "Big conference for important people",
      allDay: false,
    },
    {
      id: 6,
      title: "Meeting",
      start: new Date(2024, 1, 12, 10, 30, 0, 0),
      end: new Date(2024, 1, 12, 12, 30, 0, 0),
      desc: "Pre-meeting meeting, to prepare for the meeting",
      allDay: false,
    },
    {
      id: 7,
      title: "Lunch",
      start: new Date(2024, 1, 12, 12, 0, 0, 0),
      end: new Date(2024, 1, 12, 13, 0, 0, 0),
      desc: "Power lunch",
      allDay: false,
    },
    {
      id: 8,
      title: "Meeting",
      start: new Date(2024, 1, 12, 14, 0, 0, 0),
      end: new Date(2024, 1, 12, 15, 0, 0, 0),
      allDay: false,
    },
    {
      id: 9,
      title: "Happy Hour",
      start: new Date(2024, 1, 12, 17, 0, 0, 0),
      end: new Date(2024, 1, 12, 17, 30, 0, 0),
      desc: "Most important meal of the day",
      allDay: false,
    },
    {
      id: 10,
      title: "Dinner",
      start: new Date(2024, 1, 12, 20, 0, 0, 0),
      end: new Date(2024, 1, 12, 21, 0, 0, 0),
      allDay: false,
    },
    {
      id: 11,
      title: "Planning Meeting with Paige",
      start: new Date(2024, 1, 13, 8, 0, 0),
      end: new Date(2024, 1, 13, 10, 30, 0),
      allDay: false,
    },
  ];
  const [myEvents, setMyEvents] = useState(events);

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
      <div className="h-full w-full">
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
      </div>
    </>
  );
};

export default CalenderTab;
