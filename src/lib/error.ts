// tslint:disable max-classes-per-file
export class NotFoundServiceSignature extends Error {
  constructor(name: string) {
    super(`service ${name} does not have a valid signature`);
  }
}

export class InvalidServiceSignature extends Error {
  constructor(name: string) {
    super(`service ${name} does not have a 'constructor' in its signature`);
  }
}

export class InvalidServiceSignatureTags extends Error {
  constructor(name: string) {
    super(`service ${name} does not have a valid tags. Tags should be an array of some string tags`);
  }
}
