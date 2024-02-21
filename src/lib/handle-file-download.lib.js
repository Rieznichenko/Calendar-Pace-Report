import { saveAs } from 'file-saver';

import { BASE_API_URL } from '../constants';

export const handleFileDownload = async (resource) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/bwid/serve_report?destinationPath=${resource}`
    );

    const fileBlob = await response.blob();

    saveAs(fileBlob, resource);
  } catch (error) {
    console.error(error);
  }
};
