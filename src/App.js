import React, { useCallback, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './App.css';
import { Loader } from './components/Loader';
import CustomToolbar from './components/CustomToolBar';
import DateCellWrapper from './components/DateCellWrapper';
import { getAllPaceReportStatus } from './lib/get-all-pace-report-status.lib';
import { handleFileDownload } from './lib/handle-file-download.lib';
import { checkUploadedFile } from './lib/check-uploaded-file';

const localizer = momentLocalizer(moment);

const App = () => {
  const [didUserUploadFile, setDidUserUploadFile] = useState(true);
  const [isLoadingFileChecking, setIsLoadingFileChecking] = useState(false);

  const handleCheckUploadedFile = useCallback(async (date) => {
    setIsLoadingFileChecking(true);

    await checkUploadedFile(date)
      .then(({ success }) => {
        console.log(success);
        setDidUserUploadFile(success);
      })
      .finally(() => {
        setIsLoadingFileChecking(false);
      });
  }, []);

  const { isLoading, data: events } = useQuery({
    queryKey: ['get-data'],
    queryFn: async () => {
      const [res] = await Promise.all([
        getAllPaceReportStatus(),
        handleCheckUploadedFile(new Date()),
      ]);

      return Promise.resolve(res);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const handleEventClick = async (event) => {
    try {
      await handleFileDownload(event.resource);
    } catch (error) {
      console.error(error);
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
          onNavigate={(newDate) => handleCheckUploadedFile(newDate)}
          components={{
            toolbar: (props) => (
              <CustomToolbar
                {...props}
                isLoading={isLoadingFileChecking}
                didUserUploadFile={didUserUploadFile}
              />
            ),
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
