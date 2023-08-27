import LossGenerator from './LossGenerator';

class UniformLossGenerator extends LossGenerator {
    generateLoss() {
        const { min, max } = this.parameters;
        return Math.random() * (max - min) + min;
    }
}

export default UniformLossGenerator;