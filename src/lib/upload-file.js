import { BASE_API_URL } from '../constants';

export async function uploadFile(file, data) {
  // data => { year: 'string', month: 'string' }
  try {
    const formData = new FormData();
    formData.append('file', file); // append the file
    formData.append('year', data.year); // append the year
    formData.append('month', data.month); // append the month

    await fetch(`${BASE_API_URL}/sta/upload_report`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    throw error;
  }
}
