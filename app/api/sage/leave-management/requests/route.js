import axios from "axios";
const baseUrl = "https://crossian.sage.hr/api/"
const sageApiToken = process.env.SAGE_API_TOKEN;

function getDaysBetween(startDateStr, endDateStr) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    // Calculate difference in milliseconds
    const diffMs = end - start;
    // Convert milliseconds to days
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}


export async function GET() {
  const headers = {
    "X-Auth-Token": `${sageApiToken}`,
    "Content-Type": "application/json"
  };

  const response = await axios.get(`${baseUrl}leave-management/requests`, { headers });
  const data = response.data.data;
  const result = []
  data.forEach(element => {
    var isSpecificTime = element.specific_time;
    var totalHours = 0;
    if(isSpecificTime)
      totalHours = element.hours;
    else{
      totalHours = getDaysBetween(element.start_date, element.end_date) * 8;
    }
    result.push({
      id: element.employment_id,
      status: element.status,
      start_date: element.start_date,
      end_date: element.end_date,
      totalHours: totalHours
    });
  });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
