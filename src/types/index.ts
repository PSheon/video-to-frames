export * from "./setup-config";
export * from "./setup-dependencies";
export * from "./preparing-input";
export * from "./inference-frame";
export * from "./split-frames";
export * from "./merge-frames";

declare global {
  namespace NodeJS {
    interface Global {
      baseDirName: string;
      fileMimeType: string;
    }
  }
}
