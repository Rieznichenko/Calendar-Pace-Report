import { toast } from 'react-toastify';

import { BASE_API_URL } from '../constants';

export async function checkUploadedFile(date) {
  try {
    const parsedDate = new Date(date);

    const month = parsedDate.getMonth().toString();
    const year = parsedDate.getFullYear().toString();

    const response = await fetch(`${BASE_API_URL}/sta/check_report`, {
      method: 'PATCH',
      body: JSON.stringify({ month, year }),
    });

    const data = await response.json();

    if (data.message) {
      toast(data.message, {
        type: 'warning',
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
}
