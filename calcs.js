const {DistributionFactory } = require("./loss");
const {XoLTreaty, XoLTreatyLossGenerator } = require("./treaty")

// Example usage
const distributionType = "normal"; // Choose either "normal" or "uniform"
const distributionParameters = {
    mean: 1000000,
    standardDeviation: 200000,
    min: 500000,
    max: 1500000,
};
const attachment = 500000;
const limit = 500000;
const numLosses = 1000;

const generator = DistributionFactory.createGenerator(distributionType, distributionParameters);
const xolTreaty = new XoLTreaty(attachment, limit);
const xolGenerator = new XoLTreatyLossGenerator(generator, xolTreaty);

const { grossLosses, netLosses } = xolGenerator.generateLossesWithTreaty(numLosses);

console.log("Gross losses:", grossLosses);
console.log("Net losses with XoL Treaty:", netLosses);
