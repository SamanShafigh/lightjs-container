import { Driver } from './Driver';

class BwDriver implements Driver {
  public print(text: string, paper: string): Promise<string> {
    // Print something as a driver only
    return Promise.resolve(`Print ${text} with B&W ink on ${paper}`);
  }
}

export default BwDriver;
