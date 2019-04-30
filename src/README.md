# Container

This package helps you to build a container and resolve dependency injections

Imagine you have the following 3 services. Note that in order to build a new Printer service you have to build a driver and inject to printer as DI.

```js
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
```

```js
class BwDriver implements Driver {
  public print(text: string, paper: string): Promise<string> {
    // Print something as a driver only
    return Promise.resolve(`Print ${text} with B&W ink on ${paper}`);
  }
}
```

```js
class ColorDriver implements Driver {
  public print(text: string, paper: string): Promise<string> {
    // Print something as a driver only
    return Promise.resolve(`Print ${text} with color ink on ${paper}`);
  }
}
```

Now you can define your services and their DI in a following format. You can save these in a file for example called services.ts

```js
import BwDriver from './lib/BwDriver';
import ColorDriver from './lib/ColorDriver';
import Printer from './lib/Printer';

export const bwPrinter = {
  constructor: (c: Container) => new Printer(new BwDriver()),
};

export const colorPrinter = {
  constructor: (c: Container) => new Printer(new ColorDriver()),
};
```

Now in your app you can build a Container with these service definitions (we call them service signatures)

```js
// Build a container (a service initialiser/locator) with my service signatures
const container = new Container(builders);

// Cull any service you like
container.get('bwPrinter')
  .print('Hello & bonjour')
  .then((result: string) => console.log(result));

// Cull any service you like
container.get('colorPrinter')
  .print('Hello & bonjour')
  .then((result: string) => console.log(result));
```

As you can see you have access to Container so you can build the chain of DI, For example imagine you have service C that depends on B and B also depends on A. So you can do it easily like this.

```js
import A from './lib/A';
import B from './lib/B';
import C from './lib/C';

export const a = {
  constructor: (c: Container) => new A(),
};

export const b = {
  constructor: (c: Container) => new B(c.get('a')),
};

export const c = {
  constructor: (c: Container) => new C(c.get('b')),
};
```
When later you want to access the service C for the first time, we will take care of instantiating the chain of dependencies in order to build a singleton instance of service C. 

```js
container.get('c').doThis('Do something');
```