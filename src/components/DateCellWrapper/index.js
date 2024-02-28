import React from 'react';

import { handleFileDownload } from '../../lib/handle-file-download.lib';

const DateCellWrapper = ({ children, value, data }) => {
  const isThereSomething = data?.find((item) => {
    const dateObject = new Date(item.start);

    dateObject.setHours(0);
    dateObject.setMinutes(0);
    dateObject.setSeconds(0);
    dateObject.setMilliseconds(0);

    return dateObject.toDateString() === new Date(value).toDateString();
  });

  if (!isThereSomething)
    return (
      <div
        style={{
          borderRight: '1px solid white',
          borderLeft: '1px solid white',
          position: 'relative',
          width: '100%',
        }}
      >
        {children}
      </div>
    );

  const handleDownloadClick = async (date) => {
    await handleFileDownload(isThereSomething.resource);
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <button
        style={{
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          padding: 5,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onClick={() => handleDownloadClick(value)}
        title="Download Excel"
      >
        <img
          src="/icons8-microsoft-excel-2019-240.png"
          alt="Download"
          style={{
            width: 100,
            height: 100,
          }}
        />
      </button>
      {children}
      {/* Render your icon here */}
    </div>
  );
};

export default DateCellWrapper;
