export enum CLIENT_ENVIRONMENT_MODE {
  ESLint = 'ESLint',
  Webpack = 'Webpack',
}

export interface PackagePrediction {
  name: string;
  [any: string]: unknown;
}
