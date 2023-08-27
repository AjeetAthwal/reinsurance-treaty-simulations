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

export default LossGenerator;