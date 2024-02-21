import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './App.css';
import { Loader } from './components/Loader';
import CustomToolbar from './components/CustomToolBar';
import DateCellWrapper from './components/DateCellWrapper';
import { getAllPaceReportStatus } from './lib/get-all-pace-report-status.lib';
import { handleFileDownload } from './lib/handle-file-download.lib';

const localizer = momentLocalizer(moment);

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getAllPaceReportStatus()
      .then((res) => setEvents(res))
      .finally(() => setIsLoading(false));
  }, []);

  const handleEventClick = async (event) => {
    setIsLoading(true);

    try {
      await handleFileDownload(event.resource);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          resourceAccessor="resource"
          onSelectEvent={handleEventClick}
          components={{
            toolbar: CustomToolbar,
            dateCellWrapper: (props) => (
              <DateCellWrapper data={events} {...props} />
            ),
          }}
        />
      )}
    </div>
  );
};

export default App;
