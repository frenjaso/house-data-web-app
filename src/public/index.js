(async function() {

    new Chart(
        document.getElementById('particulateChart'),
        {
            type: 'line',
            data: {
                labels: items.map(row => row.time),
                datasets: [
                    {
                        label: 'pm2.5',
                        data: items.map(row => row.pmt25)
                    }
                ]
            }
        }
    );
})();