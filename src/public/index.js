(async function() {

    new Chart(
        document.getElementById('particulateChart'),
        {
            type: 'line',
            data: {
                labels: items.map(row => `${row.date}T${row.time}`),
                datasets: [
                    {
                        label: 'pm2.5',
                        data: items.map(row => row.pmt25)
                    },
                    {
                        label: 'pm10',
                        data: items.map(row => row.pmt10)
                    }
                ]
            }
        }
    );
})();