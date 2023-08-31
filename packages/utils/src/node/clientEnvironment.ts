/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CLIENT_ENVIRONMENT_MODE } from "./types";

export type ClientEnvModeType = keyof typeof CLIENT_ENVIRONMENT_MODE;

// Get cwd project environment variables with .env.js file
export default function clientEnvironment(mode: ClientEnvModeType = "ESLint") {
  let externalConstants: Record<string, any> = {};
  const externalEnvsPath = join(process.cwd(), ".env.cjs");

  if (existsSync(externalEnvsPath)) {
    console.log("[mononow] env file found");
    externalConstants = require(externalEnvsPath); // eslint-disable-line
    externalConstants = Object.keys(externalConstants).reduce(
      (accumulator: Record<string, unknown>, key) => {
        if (mode === "ESLint") {
          accumulator[key] = "readonly";
        } else {
          accumulator[key] = externalConstants[key];
        }

        return accumulator;
      },
      {},
    );
  }

  return externalConstants;
}
