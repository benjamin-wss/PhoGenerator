"use strict";

const PhoGeneratorService = require("../../lib/services/pho.generator.service");

module.exports = {
  description:
    " Generates a bowl of Pho with everything you need in the container.",
  run: async function(toolbox) {
    const service = new PhoGeneratorService();
    await service.GenerateContainer(toolbox);
    await service.GenerateRedux(toolbox);
    await service.GenerateSaga(toolbox);
  }
};
