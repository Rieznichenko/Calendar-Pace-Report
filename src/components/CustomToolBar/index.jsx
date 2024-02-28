import React, { useCallback } from 'react';
import { Navigate } from 'react-big-calendar';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../../index';

import { uploadFile } from '../../lib/upload-file';

const CustomToolbar = ({ didUserUploadFile, isLoading, ...toolbar }) => {
  const { mutateAsync, isPending: isUploadingFile } = useMutation({
    mutationKey: ['upload-file'],
    mutationFn: async (file) => {
      if (!file) return;

      if (didUserUploadFile) {
        return toast('You already uploaded a file this mounth', {
          type: 'warning',
        });
      }

      const selectedDate = new Date(toolbar.date);
      const month = selectedDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
      const year = selectedDate.getFullYear();

      return uploadFile(file, { month, year });
    },
    onSuccess: (data) => {
      queryClient.refetchQueries('get-data');
    },
  });

  const handleNavigation = useCallback(
    (nav) => {
      toolbar.onNavigate(nav);
    },
    [toolbar]
  );

  return (
    <div className="rbc-toolbar">
      <span
        className="rbc-btn-group"
        style={{
          width: '145px',
        }}
      >
        <button
          type="button"
          onClick={() => handleNavigation(Navigate.PREVIOUS)}
          disabled={isLoading}
        >
          &#8249;
        </button>
        <button
          type="button"
          onClick={() => handleNavigation(Navigate.TODAY)}
          disabled={isLoading}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => handleNavigation(Navigate.NEXT)}
          disabled={isLoading}
        >
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
        onChange={(e) => mutateAsync(e.target.files[0])}
        multiple={false}
        accept=".xlsx"
        disabled={isLoading || didUserUploadFile}
      />
      <label
        htmlFor="file"
        className="rbc-file-upload-label"
        style={{
          opacity: didUserUploadFile ? '0.75' : '1',
          cursor: didUserUploadFile ? 'not-allowed' : 'pointer',
          color: didUserUploadFile && 'red',
        }}
      >
        {isLoading || isUploadingFile
          ? 'Loading...'
          : didUserUploadFile
          ? 'STA report already uploaded'
          : 'Upload STA report'}
      </label>
    </div>
  );
};

export default CustomToolbar;
