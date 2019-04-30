import BwDriver from './lib/BwDriver';
import ColorDriver from './lib/ColorDriver';
import Printer from './lib/Printer';

export const bwPrinter = {
  constructor: (c: any) => new Printer(new BwDriver()),
};

export const colorPrinter = {
  constructor: (c: any) => new Printer(new ColorDriver()),
};
