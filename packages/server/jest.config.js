/* eslint-disable import/no-default-export -- export config JEST */
import Defaults from "jest-config";

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: [
    ...Defaults.defaults.moduleFileExtensions,
    "ts",
    "tsx",
  ],
};

export default config;
