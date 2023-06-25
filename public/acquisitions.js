(async function() {

    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    new Chart(
        document.getElementById('acquisitions'),
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