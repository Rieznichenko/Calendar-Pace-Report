import React, { useCallback } from 'react';
import { Navigate } from 'react-big-calendar';
import { toast } from 'react-toastify';

const CustomToolbar = ({ didUserUploadFile, ...toolbar }) => {
  const handleFileUpload = useCallback(
    (file) => {
      if (!file) return;

      if (didUserUploadFile) {
        return toast('You already uploaded a file this mounth', {
          type: 'warning',
        });
      }

      const selectedDate = new Date(toolbar.date);
      const selectedMonth = selectedDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
      const selectedYear = selectedDate.getFullYear();

      console.log({ selectedYear, selectedMonth });
    },
    [toolbar, didUserUploadFile]
  );

  const handleNavigation = useCallback(
    (nav) => {
      toolbar.onNavigate(nav);
    },
    [toolbar]
  );

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button
          type="button"
          onClick={() => handleNavigation(Navigate.PREVIOUS)}
        >
          &#8249;
        </button>
        <button type="button" onClick={() => handleNavigation(Navigate.TODAY)}>
          Today
        </button>
        <button type="button" onClick={() => handleNavigation(Navigate.NEXT)}>
          &#8250;
        </button>
      </span>
      <span className="rbc-toolbar-label">
        <b>{toolbar.label}</b>
      </span>
      <input
        type="file"
        style={{ display: 'none' }}
        id="file"
        onChange={(e) => handleFileUpload(e.target.files[0])}
        multiple={false}
        accept=".xlsx"
      />
      <label htmlFor="file" className="rbc-file-upload-label">
        Upload
      </label>
    </div>
  );
};

export default CustomToolbar;
