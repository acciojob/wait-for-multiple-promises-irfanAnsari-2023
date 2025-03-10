document.addEventListener("DOMContentLoaded", function () {
    const outputTable = document.getElementById("output");

    // Add a loading row with an ID
    outputTable.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

    // Function to create a promise with a random delay (1-3 seconds)
    function createPromise(id) {
        const delay = Math.random() * 2000 + 1000; // Random delay between 1-3 seconds
        return new Promise((resolve) => {
            setTimeout(() => resolve({ id, time: (delay / 1000).toFixed(3) }), delay);
        });
    }

    // Generate 3 promises
    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    // Wait for all promises to resolve
    Promise.all(promises).then((results) => {
        // Remove the loading row (Fix for Cypress test)
        document.getElementById("loading").remove();

        // Populate table with resolved values
        results.forEach((result) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>Promise ${result.id}</td><td>${result.time}</td>`;
            outputTable.appendChild(row);
        });

        // Calculate total time (max of all promise times)
        const totalTime = Math.max(...results.map((r) => parseFloat(r.time))).toFixed(3);
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime}</strong></td>`;
        outputTable.appendChild(totalRow);
    });
});
