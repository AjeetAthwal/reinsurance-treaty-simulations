import { NormalLossGenerator, UniformLossGenerator } from '../classes/index.js';

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

export default DistributionFactory;