import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalenderTab = () => {
  const events = [
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ];
  const onEventResize = (data) => {
    const { start, end } = data;
    events[0].start = start;
    events[0].end = end;
    return events;
  };

  const onEventDrop = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="h-full w-ful">
        <DnDCalendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          resizable
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", w: "100%" }}
        />
      </div>
    </>
  );
};

export default CalenderTab;
