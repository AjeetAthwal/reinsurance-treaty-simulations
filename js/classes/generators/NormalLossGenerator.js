import LossGenerator from './LossGenerator';

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

export default NormalLossGenerator;