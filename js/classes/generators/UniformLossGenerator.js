import LossGenerator from './LossGenerator.js';

class UniformLossGenerator extends LossGenerator {
    generateLoss() {
        const { min, max } = this.parameters;
        return Math.random() * (max - min) + min;
    }
}

export default UniformLossGenerator;