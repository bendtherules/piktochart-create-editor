export interface XYPair {
    x: number;
    y: number;
}

export function deppCloneNaive<T>(originalObject: T): T {
    return JSON.parse(JSON.stringify(originalObject));
}

export interface CanvasTextNode {
    value: string;
    position: XYPair;
  }