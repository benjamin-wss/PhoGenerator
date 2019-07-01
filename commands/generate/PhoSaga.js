"use strict";

const PhoGeneratorService = require('../../lib/services/pho.generator.service');

module.exports = {
  description: "Generates a saga with an optional test.",
  run: async function(toolbox) {
    await new PhoGeneratorService().GenerateSaga(toolbox);
    // // grab some features
    // const { parameters, ignite, print, strings } = toolbox;
    // const { pascalCase, isBlank } = strings;
    // const config = ignite.loadIgniteConfig();
    // // const { tests } = config

    // // validation
    // if (isBlank(parameters.first)) {
    //   print.info(`${toolbox.runtime.brand} generate saga <name>\n`);
    //   print.info("A name is required.");
    //   return;
    // }

    // const name = pascalCase(parameters.first);
    // const props = { name };

    // const jobs = [
    //   { template: `pho.saga.ejs`, target: `App/Containers/${name}/saga.js` }
    // ];
    // //   if (tests) {
    // //     jobs.push({
    // //       template: `saga-test-${tests}.ejs`,
    // //       target: `Tests/Sagas/${name}SagaTest.js`
    // //     })
    // //   }

    // // make the templates
    // await ignite.copyBatch(toolbox, jobs, props);
  }
};
