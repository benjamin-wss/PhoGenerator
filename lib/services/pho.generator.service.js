"use strict";

const patterns = require("../patterns");

module.exports = class PhoGeneratorService {
  async GenerateContainer(toolbox) {
    // grab some features
    const { parameters, strings, print, ignite, filesystem } = toolbox;
    const { pascalCase, isBlank } = strings;
    const config = ignite.loadIgniteConfig();

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${toolbox.runtime.brand} generate container <name>\n`);
      print.info("A name is required.");
      return;
    }

    const name = pascalCase(parameters.first);
    const props = { name };

    const jobs = [
      {
        template: "pho.container.ejs",
        target: `App/Containers/${name}/index.js`
      },
      {
        template: "pho.container.style.ejs",
        target: `App/Containers/${name}/style.js`
      }
    ];

    await ignite.copyBatch(toolbox, jobs, props);

    // if using `react-navigation` go the extra step
    // and insert the container into the nav router
    if (config.navigation === "react-navigation") {
      const containerName = name;
      const appNavFilePath = `${process.cwd()}/App/Navigation/AppNavigation.js`;
      const importToAdd = `import ${containerName} from '../Containers/${containerName}'`;
      const routeToAdd = `  ${containerName}: { screen: ${containerName} },`;

      if (!filesystem.exists(appNavFilePath)) {
        const msg = `No '${appNavFilePath}' file found.  Can't insert container.`;
        print.error(msg);
        process.exit(1);
      }

      // insert container import
      ignite.patchInFile(appNavFilePath, {
        after: patterns[patterns.constants.PATTERN_IMPORTS],
        insert: importToAdd
      });

      // insert container route
      ignite.patchInFile(appNavFilePath, {
        after: patterns[patterns.constants.PATTERN_ROUTES],
        insert: routeToAdd
      });
    } else {
      print.info("Container created, manually add it to your navigation");
    }
  }

  async GenerateRedux(toolbox) {
    // grab some features
    const { parameters, ignite, strings, print } = toolbox;
    const { isBlank, pascalCase } = strings;
    const config = ignite.loadIgniteConfig();

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${toolbox.runtime.brand} generate redux <name>\n`);
      print.info("A name is required.");
      return;
    }

    const name = pascalCase(parameters.first);
    const props = { name };

    const jobs = [
      { template: `pho.redux.ejs`, target: `App/Containers/${name}/redux.js` }
    ];

    await ignite.copyBatch(toolbox, jobs, props);
  }

  async GenerateSaga(toolbox) {
    // grab some features
    const { parameters, ignite, print, strings } = toolbox;
    const { pascalCase, isBlank } = strings;
    const config = ignite.loadIgniteConfig();
    // const { tests } = config

    // validation
    if (isBlank(parameters.first)) {
      print.info(`${toolbox.runtime.brand} generate saga <name>\n`);
      print.info("A name is required.");
      return;
    }

    const name = pascalCase(parameters.first);
    const props = { name };

    const jobs = [
      { template: `pho.saga.ejs`, target: `App/Containers/${name}/saga.js` }
    ];
    //   if (tests) {
    //     jobs.push({
    //       template: `saga-test-${tests}.ejs`,
    //       target: `Tests/Sagas/${name}SagaTest.js`
    //     })
    //   }

    // make the templates
    await ignite.copyBatch(toolbox, jobs, props);
  }
};
