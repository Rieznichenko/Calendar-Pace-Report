import { toast } from 'react-toastify';

import { api } from '../api';

export async function uploadFile(file, data) {
  // data => { year: 'string', month: 'string' }
  try {
    const formData = new FormData();
    formData.append('file', file); // append the file
    formData.append('year', data.year); // append the year
    formData.append('month', data.month); // append the month

    const response = await api
      .post('/sta/upload_report', formData)
      .then((res) => res.data);

    console.log(response);

    if (response.message) {
      toast(response.message, {
        type: 'warning',
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
}
