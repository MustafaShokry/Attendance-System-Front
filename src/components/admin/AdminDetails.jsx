import { useEffect, useState } from 'react';
import { fetchCourseDetails } from '../../api/admin/statistics.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { set } from 'date-fns';




function AdminDetails({ courseId, courseName, onCloseButtonClick }) {
  const [Data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [info, setinfo] = useState([]);
  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Students Attendance',
        backgroundColor: ['#36A2EB'],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(54, 162, 235, 0.6)'],
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: info,
      },
    ],
  };
  

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const data = await fetchCourseDetails(courseId);   
        setData(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchLectureData();
  }, [courseId]);

  useEffect(() => {
    setLabels([]);
    setinfo([]);
    Data.forEach((element) => {
      setLabels((oldArray) => [...oldArray, element.date]);
      setinfo((oldArray) => [...oldArray, element.numStudentsAttended]);
    });
  }, [Data]);

  useEffect(() => {
    barChartData.labels = labels;
  }, [labels]);
  useEffect(() => {

    console.log(barChartData.datasets[0].data);
    console.log(info);
    barChartData.datasets[0].data = [10, 20, 30];
  }, [info]);
 

  return (
    <div className="max-w-5xl mx-auto py-2 mt-10">
      <div className="bg-white rounded-lg border shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">{courseName} Lecture Details</h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            onClick={onCloseButtonClick}
          >
            Close
          </button>
        </div>
        <Bar
          data={barChartData}
          options={{
            responsive: false, // Disable responsiveness
            maintainAspectRatio: false, // Allow aspect ratio to change
            scales: {
              x: {
                type: 'category',
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
            // Set the width and height of the chart canvas
            width: 500, // Set a specific width
            height: 500, // Set a specific height
          }}
        />

      </div>
    </div>
  );
}

export default AdminDetails;
