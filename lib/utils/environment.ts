// webpack will populate the process var via EnvironmentPlugin
declare var process: any;

export const Environment = {
  PRODUCTION: process.env.NODE_ENV === 'production'
};
