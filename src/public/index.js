(async function() {

    const chart = new Chart(
        document.getElementById('particulateChart'),
        {
            type: 'line',
            data: {}
        }
    );

    let items = [];

    do {
        try {
            const newItems = await fetchItems();
            const dataUnchanged = newItems.length === items.length && newItems[newItems.length - 1].epoch === items[items.length - 1].epoch;
            if (!dataUnchanged) {
                chart.data = buildChartData(newItems);
                chart.update();
                items = newItems;
            }
        } catch (error) {
            console.log("Error while fetching items: " + error)
        } finally {
            await new Promise(r => setTimeout(r, 60000));
        }
    } while (autoReload);


})();

function buildChartData(items) {
    return {
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

async function fetchItems() {
    const response = await fetch(`/api/particulate?periodInMinutes=${periodInMinutes}&daysOfData=${daysOfData}`);
    return await response.json();
}
