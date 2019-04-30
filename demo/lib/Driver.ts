export type PrintFunc = (text: string, paper: string) => Promise<string>;

export interface Driver {
  print: PrintFunc;
}
