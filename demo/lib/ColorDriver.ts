import { Driver } from './Driver';

class ColorDriver implements Driver {
  public print(text: string): Promise<string> {
    // Print something as a driver only
    return Promise.resolve(`Print ${text} with color ink on an imaginary paper`);
  }
}

export default ColorDriver;
