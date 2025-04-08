
const hrData = [];
const spo2Data = [];
const tempData = [];
const bpSysData = [];
const bpDiaData = [];
const labels = [];

const hrChart = new Chart(document.getElementById('heartRateChart'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'BPM',
      data: hrData,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true
  }
});

const spo2Chart = new Chart(document.getElementById('spo2Chart'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: '% SpO2',
      data: spo2Data,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true
  }
});

const tempChart = new Chart(document.getElementById('tempChart'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: '°C',
      data: tempData,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true
  }
});

const bpChart = new Chart(document.getElementById('bpChart'), {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Systolic',
        data: bpSysData,
        borderWidth: 2,
        borderColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'Diastolic',
        data: bpDiaData,
        borderWidth: 2,
        borderColor: 'rgb(54, 162, 235)'
      }
    ]
  },
  options: {
    responsive: true
  }
});

function updateCharts() {
  const now = new Date().toLocaleTimeString();
  labels.push(now);
  if (labels.length > 10) {
    labels.shift();
    hrData.shift();
    spo2Data.shift();
    tempData.shift();
    bpSysData.shift();
    bpDiaData.shift();
  }

  const hr = Math.floor(Math.random() * 40) + 60;
  const spo2 = Math.floor(Math.random() * 5) + 94;
  const temp = (Math.random() * 1.5 + 36.5).toFixed(1);
  const sys = Math.floor(Math.random() * 20) + 110;
  const dia = Math.floor(Math.random() * 15) + 70;

  hrData.push(hr);
  spo2Data.push(spo2);
  tempData.push(temp);
  bpSysData.push(sys);
  bpDiaData.push(dia);

  document.getElementById('alertHR').textContent = hr > 130 ? "High heart rate!" : "Heart rate normal.";
  document.getElementById('alertSpO2').textContent = spo2 < 92 ? "Low SpO₂ level!" : "SpO₂ level normal.";
  document.getElementById('alertTemp').textContent = temp > 38 ? "Elevated temperature!" : "Temperature normal.";
  document.getElementById('alertBP').textContent = (sys > 140 || dia > 90) ? "High blood pressure!" : "Blood pressure normal.";

  hrChart.update();
  spo2Chart.update();
  tempChart.update();
  bpChart.update();
}

setInterval(updateCharts, 3000);

document.getElementById('downloadHR').onclick = () => downloadCSV('HeartRate', labels, hrData);
document.getElementById('downloadSpO2').onclick = () => downloadCSV('SpO2', labels, spo2Data);
document.getElementById('downloadTemp').onclick = () => downloadCSV('Temperature', labels, tempData);
document.getElementById('downloadBP').onclick = () => {
  const rows = labels.map((label, i) => [label, bpSysData[i], bpDiaData[i]]);
  downloadCustomCSV('BloodPressure', ['Time', 'Systolic', 'Diastolic'], rows);
};

function downloadCSV(name, labels, data) {
  let csv = "Time,Value\n";
  for (let i = 0; i < labels.length; i++) {
    csv += `${labels[i]},${data[i]}\n`;
  }
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name}.csv`;
  a.click();
}

function downloadCustomCSV(name, headers, rows) {
  let csv = headers.join(',') + "\n";
  for (let row of rows) {
    csv += row.join(',') + "\n";
  }
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name}.csv`;
  a.click();
}
