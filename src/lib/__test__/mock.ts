export const serviceA = jest.fn();
export const serviceB = jest.fn();

export const builder = {
  serviceA: {
    constructor: () => serviceA(),
  },
  serviceB: {
    constructor: () => serviceB(),
  },
};
