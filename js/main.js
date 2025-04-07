
const ctxHR = document.getElementById('heartRateChart').getContext('2d');
const ctxSpO2 = document.getElementById('spo2Chart').getContext('2d');
const ctxTemp = document.getElementById('tempChart').getContext('2d');

// Alert elements
const alertHR = document.getElementById('alertHR');
const alertSpO2 = document.getElementById('alertSpO2');
const alertTemp = document.getElementById('alertTemp');

let heartRateData = {
  labels: [],
  datasets: [{
    label: 'Heart Rate (BPM)',
    data: [],
    borderColor: 'red',
    borderWidth: 2,
    fill: false
  }]
};

let spo2Data = {
  labels: [],
  datasets: [{
    label: 'SpO₂ (%)',
    data: [],
    borderColor: 'blue',
    borderWidth: 2,
    fill: false
  }]
};

let tempData = {
  labels: [],
  datasets: [{
    label: 'Body Temperature (°C)',
    data: [],
    borderColor: 'orange',
    borderWidth: 2,
    fill: false
  }]
};

const chartOptions = (yMin, yMax) => ({
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      labels: {
        font: { size: 12 }
      }
    },
    tooltip: {
      bodyFont: { size: 12 },
      titleFont: { size: 13 }
    }
  },
  scales: {
    x: {
      ticks: { font: { size: 10 } }
    },
    y: {
      min: yMin,
      max: yMax,
      ticks: { font: { size: 10 } }
    }
  }
});

let heartRateChart = new Chart(ctxHR, {
  type: 'line',
  data: heartRateData,
  options: chartOptions(50, 150)
});

let spo2Chart = new Chart(ctxSpO2, {
  type: 'line',
  data: spo2Data,
  options: chartOptions(85, 100)
});

let tempChart = new Chart(ctxTemp, {
  type: 'line',
  data: tempData,
  options: chartOptions(35, 40)
});

function simulateReading(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateAlerts(hr, spo2, temp) {
  alertHR.textContent = hr > 130 ? "High heart rate!" : "Heart rate normal.";
  alertSpO2.textContent = spo2 < 92 ? "Low SpO₂ level!" : "SpO₂ level normal.";
  alertTemp.textContent = temp > 38 ? "Elevated temperature!" : "Temperature normal.";
}

function updateCharts() {
  const now = new Date().toLocaleTimeString();

  const newHR = simulateReading(60, 100);
  heartRateData.labels.push(now);
  heartRateData.datasets[0].data.push(newHR);
  if (heartRateData.labels.length > 10) {
    heartRateData.labels.shift();
    heartRateData.datasets[0].data.shift();
  }

  const newSpO2 = simulateReading(92, 99);
  spo2Data.labels.push(now);
  spo2Data.datasets[0].data.push(newSpO2);
  if (spo2Data.labels.length > 10) {
    spo2Data.labels.shift();
    spo2Data.datasets[0].data.shift();
  }

  const newTemp = (Math.random() * (38.5 - 36.2) + 36.2).toFixed(1);
  tempData.labels.push(now);
  tempData.datasets[0].data.push(newTemp);
  if (tempData.labels.length > 10) {
    tempData.labels.shift();
    tempData.datasets[0].data.shift();
  }

  updateAlerts(newHR, newSpO2, newTemp);

  heartRateChart.update();
  spo2Chart.update();
  tempChart.update();
}

function downloadCSV(chartData, filename) {
  const labels = chartData.labels;
  const data = chartData.datasets[0].data;
  let csvContent = "data:text/csv;charset=utf-8,Time,Value\n";
  labels.forEach((label, i) => {
    csvContent += `${label},${data[i]}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById('downloadHR').addEventListener('click', () => {
  downloadCSV(heartRateData, "heart_rate_data.csv");
});
document.getElementById('downloadSpO2').addEventListener('click', () => {
  downloadCSV(spo2Data, "spo2_data.csv");
});
document.getElementById('downloadTemp').addEventListener('click', () => {
  downloadCSV(tempData, "temperature_data.csv");
});

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

setInterval(updateCharts, 3000);
