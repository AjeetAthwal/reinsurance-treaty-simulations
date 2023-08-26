const {LossGenerator} = require("./loss");

class XoLTreaty {
    constructor(attachment, limit) {
        this.attachment = attachment;
        this.limit = limit;
    }

    applyTreaty(loss) {
        const cappedLoss = Math.min(loss - this.attachment, this.limit);
        return Math.max(cappedLoss, 0);
    }
}

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

module.exports = {XoLTreaty, XoLTreatyLossGenerator };
