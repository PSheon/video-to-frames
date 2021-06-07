export * from "./setup-config";
export * from "./setup-dependencies";
export * from "./preparing-input";
export * from "./inference-frame";
export * from "./split-frames";

declare global {
  namespace NodeJS {
    interface Global {
      baseDirName: string;
      fileMimeType: string;
    }
  }
}
