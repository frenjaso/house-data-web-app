(async function() {

    console.log("hello");

    const chart = new Chart(
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

    while (true) {
        await new Promise(r => setTimeout(r, 5000));

        fetch('/api/particulate').then(response => {
            response.json().then(items => {

                // if (item[item.length - 1])

                const data = {
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
                chart.data = data;
                chart.update();
            })
        })
    }


})();
