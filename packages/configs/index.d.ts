declare module '@arpon/configs/envModes.cjs' {
  const NODE_ENV: string | undefined;
  const DEBUG_LVL: number | undefined;
  const IS_PROD: boolean;
  const IS_DEV: boolean;
  const IS_BROWSER: boolean;
  const IS_WATCHING: () => boolean;
  const IS_TEST: () => boolean;

  export { NODE_ENV, DEBUG_LVL, IS_PROD, IS_DEV, IS_BROWSER, IS_WATCHING, IS_TEST };
}
