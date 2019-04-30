// tslint:disable no-console
import Container from '../src';
import * as builders from './services';

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
