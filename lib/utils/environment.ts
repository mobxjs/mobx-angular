// webpack will populate the process var via EnvironmentPlugin
declare var process: any;

export const Environment = {
  PRODUCTION: boolean = process.env.NODE_ENV === 'production'
};
