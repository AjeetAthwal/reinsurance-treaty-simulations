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

    // Generate formatted output
    const formattedOutput = `
    Gross losses: ${grossLosses.join(", ")}
    Net losses with XoL Treaty: ${netLosses.join(", ")}
    `;

    // Display the output in the UI
    displayOutput(formattedOutput);
}

// Attach event listener to the calculate button
const calculateButton = document.getElementById("calculate-button");
calculateButton.addEventListener("click", calculateResults);
