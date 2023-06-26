(async function() {

    new Chart(
        document.getElementById('particulateChart'),
        {
            type: 'line',
            data: {
                labels: items.map(row => row.datetime),
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