import { Ora } from "ora";

export interface IInferencePoseInput {
  spinner: Ora;
}
export interface IPoseNetInferenceInput {
  spinner: Ora;
}
export interface IPoseNetInferenceOutput {
  inferenceTime: number;
  processTime: number;
}
export interface IBlazePoseInferenceInput {
  model: any;
  modelName: "full" | "upper";
  frameName: string;
}
export interface IBlazePoseInferenceOutput {
  inferenceTime: number;
  processTime: number;
}
export interface IEfficientPoseInferenceInput {
  model: any;
  inputSize: any;
  frame: any;
}
export interface IEfficientPoseInferenceOutput {
  inferenceTime: number;
  processTime: number;
}
