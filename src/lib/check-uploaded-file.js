import { api } from '../api';

export async function checkUploadedFile(date) {
  try {
    const parsedDate = new Date(date);

    const month = (parsedDate.getMonth() + 1).toString();
    const year = parsedDate.getFullYear().toString();

    const data = await api
      .patch('/sta/check_report', {
        month,
        year,
      })
      .then((res) => Promise.resolve(res.data));

    return data;
  } catch (error) {
    throw error;
  }
}
