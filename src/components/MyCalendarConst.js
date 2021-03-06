import React, {useState} from 'react'
import { Calendar, Views, momentLocalizer} from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { changeEvent } from './redux/EventSlice';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'


const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar)

const MyCalendarConst = () => {
    const roomFilter = useSelector((state) => (state.roomFilter.room));
    const redEvents = useSelector((state) => (state.eventReducer.events));
    const personFilter = useSelector((state) => (state.personFilter.person));

    const dispatch = useDispatch();

    const handleChangeEvents = (newEvents) => {
        dispatch(changeEvent({events: newEvents}))
    }
    
    function daysInMonth (month, year) {
      return new Date(year, month+1, 0).getDate();
  }
  

    const month = new Date().getMonth();
    const year = new Date().getYear()

    const days = daysInMonth(month, 2021)
    const freeDays = []

    for(var d in [...Array(days).keys()]){
      var day = d
      freeDays.push({
        id: day,
        start: new Date(2021, month, day),
        end: new Date(2021, month, day),
        title: "Свободно",
        room: 0})

    }
    console.log(freeDays);

    /*const [state, setState] = useState({
        events: [
            {   
                id: 0,
                allDay: true,
                start: moment().toDate(),
                end: moment()
                  .add(1, "days")
                  .toDate(),
                title: "Комната 1",
                room: 1
              },
              {
                id: 1,
                allDay: true,
                start: new Date(2021, 2, 22),
                end: new Date(2021, 2, 23),
                title: "Комната 2",
                room: 2
              },
              {
                id: 2,
                allDay: true,
                start: new Date(2021, 2, 25),
                end: new Date(2021, 2, 26),
                title: "Комната 3",
                room: 3
              }
        ],
        displayDragItemInCell: true,
      })*/
      const [state, setState] = useState({
        displayDragItemInCell: true,
      })

  

  const handleDragStart = event => {
    setState({ draggedEvent: event })
  }

  const dragFromOutsideItem = () => {
    return state.draggedEvent
  }

  const onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = state

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay,
    }

    setState({ draggedEvent: null })
    moveEvent({ event, start, end })
  }

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    //const { events } = state 0000000000000000000000000000000000000000000000000000000000000000000 Раскомментировать если нужно
    const events = redEvents

    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent
    })

    handleChangeEvents(nextEvents);
    /*setState({
      events: nextEvents,
    })0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 Разкомментировать если нужно*/

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  const resizeEvent = ({ event, start, end }) => {
    //const { events } = state 0000000000000000000000000000000000000000000000000000000000000 Разкомментировать если нужно
    const events = redEvents

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    handleChangeEvents(nextEvents);

    /*setState({
      events: nextEvents,
    })0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 Разкомментировать если нужно*/

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  const newEvent = (_event) => {}



    const combineEvents = () => {
      freeDays.concat(redEvents)
      for(var i=0; i<freeDays.length; i++){
        if(redEvents){

        }
      }
    }

  
    const filterEvents = () => {
        //const returnedEvents = roomFilter == 0? state.events : state.events.filter(event => event.room === roomFilter)
        const returnedEvents = roomFilter === 0? redEvents : redEvents.filter(event => event.room === roomFilter)
        const personFiltered = personFilter === ""?  returnedEvents: returnedEvents.filter(event => event.participants.includes(personFilter))
        //return personFiltered;
        return freeDays.concat(redEvents)  
    }

    return (
      <DragAndDropCalendar
        selectable
        defaultDate={new Date()}
        localizer={localizer}
        events={filterEvents()}
        onEventDrop={moveEvent}
        resizable
        onEventResize={resizeEvent}
        onSelectSlot={newEvent}
        onDragStart={console.log}
        defaultView={Views.MONTH}
        popup={true}
        dragFromOutsideItem={
          state.displayDragItemInCell ? dragFromOutsideItem : null
        }
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
        style={{ height: "100vh" }}
        onClick={(e) => {console.log(e.target)}}
        eventPropGetter={(event) => { const backgroundColor = event.room === 0 ? "#86C86F" : event.color; return { style: { backgroundColor } }; }}
      />
    )
    }

export default MyCalendarConst
