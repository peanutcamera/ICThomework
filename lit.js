async function getChampion() {
    const year = document.getElementById('year').value;
    const championDiv = document.getElementById('champion');

    if (!year) {
        championDiv.innerHTML = 'Please enter a year.';
        return;
    }

    try {
        const response = await fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`);
        const data = await response.json();

        if (data.MRData.StandingsTable.StandingsLists.length === 0) {
            championDiv.innerHTML = `No data available for the year ${year}.`;
            return;
        }

        const champion = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver;
        const name = `${champion.givenName} ${champion.familyName}`;
        championDiv.innerHTML = `The F1 World Champion of ${year} is ${name}.`;
    } catch (error) {
        championDiv.innerHTML = 'An error occurred. Please try again later.';
        console.error('Error fetching data:', error);
    }
}
