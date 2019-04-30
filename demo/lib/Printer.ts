import { Driver } from './Driver';

class Printer {
  private driver: Driver;
  private lcd: 'ready' | 'printing';

  constructor(driver: Driver) {
    this.driver = driver;
    this.lcd = 'ready';
  }

  public async print(text: string) {
    this.lcd = 'printing';
    const imaginaryPaper = await this.driver.print(text, 'an imaginary paper');
    this.lcd = 'ready';

    return imaginaryPaper;
  }
}

export default Printer;
