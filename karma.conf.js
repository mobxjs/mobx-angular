module.exports = function(config) {
    config.set({

        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "lib/**/*.ts" },
            { pattern: "node_modules/reflect-metadata/Reflect.js" },
            { pattern: "node_modules/zone.js/dist/zone.js" },
            { pattern: "node_modules/zone.js/dist/long-stack-trace-zone.js" },
            { pattern: "node_modules/zone.js/dist/proxy.js" },
            { pattern: "node_modules/zone.js/dist/sync-test.js" },
            { pattern: "node_modules/zone.js/dist/jasmine-patch.js" },
            { pattern: "node_modules/zone.js/dist/async-test.js" },
            { pattern: "node_modules/zone.js/dist/fake-async-test.js" }
        ],

        preprocessors: {
            "lib/**/*.ts": ["karma-typescript"]
        },

        reporters: ["progress", "karma-typescript"],

        // Uncomment below if you want the default html
        // coverage report + a summary on the console
        karmaTypescriptConfig: {
          compilerOptions: {
              emitDecoratorMetadata: true,
              experimentalDecorators: true,
              module: "commonjs",
              sourceMap: true,
              target: "ES5"
          },
          include: ["lib/**/*.ts"],
        },

        // Uncomment below if you want to disable code coverage
        // instrumentation during debugging of tests
        /*
        karmaTypescriptConfig: {
            disableCodeCoverageInstrumentation: true
        },
        //*/

        browsers: ["Chrome"]
    });
};
