
const ctx = document.getElementById('heartRateChart').getContext('2d');

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

let chart = new Chart(ctx, {
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

function simulateReading(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateChart() {
    const now = new Date().toLocaleTimeString();
    const newReading = simulateReading(60, 100);

    heartRateData.labels.push(now);
    heartRateData.datasets[0].data.push(newReading);

    if (heartRateData.labels.length > 10) {
        heartRateData.labels.shift();
        heartRateData.datasets[0].data.shift();
    }

    chart.update();
}

setInterval(updateChart, 3000);


const ctxSpO2 = document.createElement('canvas');
ctxSpO2.id = 'spo2Chart';
ctxSpO2.width = 400;
ctxSpO2.height = 200;
document.getElementById('charts').appendChild(ctxSpO2);

const spo2Data = {
    labels: [],
    datasets: [{
        label: 'SpO₂ (%)',
        data: [],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false
    }]
};

let spo2Chart = new Chart(ctxSpO2.getContext('2d'), {
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

function updateSpO2Chart() {
    const now = new Date().toLocaleTimeString();
    const newReading = simulateReading(92, 99);

    spo2Data.labels.push(now);
    spo2Data.datasets[0].data.push(newReading);

    if (spo2Data.labels.length > 10) {
        spo2Data.labels.shift();
        spo2Data.datasets[0].data.shift();
    }

    spo2Chart.update();
}

setInterval(updateSpO2Chart, 3000);
