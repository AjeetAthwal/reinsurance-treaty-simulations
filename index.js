// Load input values from Local Storage
function loadInputValues() {
    const savedInputValues = localStorage.getItem('inputValues');
    if (savedInputValues) {
        const {
            distributionType,
            mean,
            standardDeviation,
            min,
            max,
            attachment,
            limit,
            numLosses
        } = JSON.parse(savedInputValues);

        document.getElementById("distribution-type").value = distributionType;
        document.getElementById("mean").value = mean;
        document.getElementById("standard-deviation").value = standardDeviation;
        document.getElementById("min").value = min;
        document.getElementById("max").value = max;
        document.getElementById("attachment").value = attachment;
        document.getElementById("limit").value = limit;
        document.getElementById("num-losses").value = numLosses;
    }
}

// Call the function to load input values when the page loads
window.addEventListener('load', loadInputValues);


// Function to display output in the UI
function displayOutput(output) {
    const outputElement = document.getElementById("output");
    outputElement.textContent = output;
}

// Function to calculate and display results
function calculateResults() {
    const distributionType = document.getElementById("distribution-type").value;
    const mean = parseFloat(document.getElementById("mean").value);
    const standardDeviation = parseFloat(document.getElementById("standard-deviation").value);
    const min = parseFloat(document.getElementById("min").value);
    const max = parseFloat(document.getElementById("max").value);
    const attachment = parseFloat(document.getElementById("attachment").value);
    const limit = parseFloat(document.getElementById("limit").value);
    const numLosses = parseInt(document.getElementById("num-losses").value);

    const generator = DistributionFactory.createGenerator(distributionType, {
        mean: mean,
        standardDeviation: standardDeviation,
        min: min,
        max: max
    });
    const xolTreaty = new XoLTreaty(attachment, limit);
    const xolGenerator = new XoLTreatyLossGenerator(generator, xolTreaty);

    const { grossLosses, netLosses } = xolGenerator.generateLossesWithTreaty(numLosses);

    // Save input values to Local Storage
    const inputValues = {
        distributionType,
        mean,
        standardDeviation,
        min,
        max,
        attachment,
        limit,
        numLosses
    };
    localStorage.setItem('inputValues', JSON.stringify(inputValues));

    // Generate formatted output
    const formattedOutput = `
    <h2>Results</h2>
    <table>
        <tr>
            <th>Index</th>
            <th>Gross Losses</th>
            <th>Net Losses with XoL Treaty</th>
        </tr>
        ${grossLosses.map((grossLoss, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${grossLoss}</td>
                <td>${netLosses[index]}</td>
            </tr>
        `).join("")}
    </table>
    `;

    // Display the output in the UI
    displayOutput(formattedOutput);
}

// Attach event listener to the calculate button
const calculateButton = document.getElementById("calculate-button");
calculateButton.addEventListener("click", calculateResults);
