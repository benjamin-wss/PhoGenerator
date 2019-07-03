"use strict";

// const patterns = require("../../lib/patterns");
const PhoGeneratorService = require("../../lib/services/pho.generator.service");

module.exports = {
  description: "Generates a redux smart component, for for Pho lovers.",
  run: async toolbox => {
    await new PhoGeneratorService().GenerateContainer(toolbox);

    const {
      parameters: { argv }
    } = toolbox;

    const sagaIsWanted = argv.findIndex(x => x.toLowerCase() === "-saga") > -1;

    if (sagaIsWanted) {
      await new PhoGeneratorService().GenerateSaga(toolbox);
    }

    const reduxIsWanted =
      argv.findIndex(x => x.toLowerCase() === "-redux") > -1;

    if (reduxIsWanted) {
      await new PhoGeneratorService().GenerateRedux(toolbox);
    }
  }
};
