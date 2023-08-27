import LossGenerator from '../generators/LossGenerator';

class XoLTreatyLossGenerator extends LossGenerator {
    constructor(generator, treaty) {
        super(generator.parameters);
        this.generator = generator;
        this.treaty = treaty;
    }

    generateLoss() {
        const originalLoss = this.generator.generateLoss();
        return this.treaty.applyTreaty(originalLoss);
    }

    generateLossesWithTreaty(numLosses) {
        const grossLosses = this.generator.generateLosses(numLosses);
        const netLosses = grossLosses.map(loss => this.treaty.applyTreaty(loss));
        return { grossLosses, netLosses };
    }
}

export default XoLTreatyLossGenerator;