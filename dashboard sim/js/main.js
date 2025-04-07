
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
