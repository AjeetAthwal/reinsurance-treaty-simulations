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
  
  class DistributionFactory {
    static createGenerator(distributionType, parameters) {
      if (distributionType === "normal") {
        return new NormalLossGenerator(parameters);
      } else if (distributionType === "uniform") {
        return new UniformLossGenerator(parameters);
      } else {
        throw new Error("Unsupported distribution type");
      }
    }
  }
  
  // Example usage
  const distributionType = "normal"; // Choose either "normal" or "uniform"
  const distributionParameters = {
    mean: 1000000,
    standardDeviation: 200000,
    min: 500000,
    max: 1500000,
  };
  const numLosses = 1000;
  
  const generator = DistributionFactory.createGenerator(distributionType, distributionParameters);
  const generatedLosses = generator.generateLosses(numLosses);
  console.log("Generated losses:", generatedLosses);
  