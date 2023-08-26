class LossGenerator {
    constructor(parameters) {
        this.parameters = parameters;
    }

    generateLoss() {
        throw new Error("generateLoss method must be implemented in subclasses");
    }

    generateLosses(numLosses) {
        const losses = [];
        for (let i = 0; i < numLosses; i++) {
            losses.push(this.generateLoss());
        }
        return losses;
    }
}

class NormalLossGenerator extends LossGenerator {
    generateLoss() {
        const { mean, standardDeviation } = this.parameters;
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const lossValue = mean + standardDeviation * z0;
        return Math.max(0, lossValue);
    }
}

class UniformLossGenerator extends LossGenerator {
    generateLoss() {
        const { min, max } = this.parameters;
        return Math.random() * (max - min) + min;
    }
}

// Define an enum for distribution types
const DistributionType = {
    NORMAL: "normal",
    UNIFORM: "uniform"
};

class DistributionFactory {
    static createGenerator(distributionType, parameters) {
        switch (distributionType) {
            case DistributionType.NORMAL:
                return new NormalLossGenerator(parameters);
            case DistributionType.UNIFORM:
                return new UniformLossGenerator(parameters);
            default:
                throw new Error("Unsupported distribution type");
        }
    }
}

module.exports = {LossGenerator, DistributionFactory, DistributionType };
