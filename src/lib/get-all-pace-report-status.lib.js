import { BASE_API_URL } from '../constants';

// {
//   title: "XLSX",
//   allDay: true,
//   start: new Date(),
//   end: new Date(),
//   resource: "path/to/your/file.xls", // Replace with the actual file path or URL
// },

export async function getAllPaceReportStatus() {
  try {
    const response = await fetch(`${BASE_API_URL}/bwid/pace_report`);

    const data = await response.json();
    function generateTitle(timestamp){
      let today = new Date(timestamp);
      return `Pace Report on ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }

    return data.map((item) => ({
      resource: item.destinationPath,
      start: new Date(item.timestamp),
      end: new Date(item.timestamp),
      title: generateTitle(item.timestamp)
    }));
  } catch (error) {
    throw error;
  }
}
