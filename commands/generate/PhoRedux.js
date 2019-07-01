"use strict";

const PhoGeneratorService = require('../../lib/services/pho.generator.service');

module.exports = {
    description: ' Generates a action/creator/reducer set for Redux.',
    run: async function(toolbox) {
      await new PhoGeneratorService().GenerateRedux(toolbox);
      // // grab some features
      // const { parameters, ignite, strings, print } = toolbox
      // const { isBlank, pascalCase } = strings
      // const config = ignite.loadIgniteConfig();
  
      // // validation
      // if (isBlank(parameters.first)) {
      //   print.info(`${toolbox.runtime.brand} generate redux <name>\n`)
      //   print.info('A name is required.')
      //   return
      // }
  
      // const name = pascalCase(parameters.first)
      // const props = { name }
  
      // const jobs = [{ template: `pho.redux.ejs`, target: `App/Containers/${name}/redux.js` }]
  
      // await ignite.copyBatch(toolbox, jobs, props)
    }
  }
