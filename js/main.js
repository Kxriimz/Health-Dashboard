
const ctxHR = document.getElementById('heartRateChart').getContext('2d');
const ctxSpO2 = document.getElementById('spo2Chart').getContext('2d');
const ctxTemp = document.getElementById('tempChart').getContext('2d');

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

let heartRateChart = new Chart(ctxHR, {
    type: 'line',
    data: heartRateData,
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 50,
                max: 150
            }
        }
    }
});

let spo2Chart = new Chart(ctxSpO2, {
    type: 'line',
    data: spo2Data,
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 85,
                max: 100
            }
        }
    }
});

let tempChart = new Chart(ctxTemp, {
    type: 'line',
    data: tempData,
    options: {
        responsive: true,
        animation: false,
        scales: {
            y: {
                min: 35,
                max: 40
            }
        }
    }
});

function simulateReading(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateCharts() {
    const now = new Date().toLocaleTimeString();

    // Heart rate
    const newHR = simulateReading(60, 100);
    heartRateData.labels.push(now);
    heartRateData.datasets[0].data.push(newHR);
    if (heartRateData.labels.length > 10) {
        heartRateData.labels.shift();
        heartRateData.datasets[0].data.shift();
    }
    heartRateChart.update();

    // SpO2
    const newSpO2 = simulateReading(92, 99);
    spo2Data.labels.push(now);
    spo2Data.datasets[0].data.push(newSpO2);
    if (spo2Data.labels.length > 10) {
        spo2Data.labels.shift();
        spo2Data.datasets[0].data.shift();
    }
    spo2Chart.update();

    // Temperature
    const newTemp = (Math.random() * (38.5 - 36.2) + 36.2).toFixed(1);
    tempData.labels.push(now);
    tempData.datasets[0].data.push(newTemp);
    if (tempData.labels.length > 10) {
        tempData.labels.shift();
        tempData.datasets[0].data.shift();
    }
    tempChart.update();
}

setInterval(updateCharts, 3000);
