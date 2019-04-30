import * as assert from 'assert';
import Container from '../container';
import {
  InvalidServiceSignature,
  InvalidServiceSignatureTags,
  NotFoundServiceSignature,
} from '../error';
import { builder, serviceA, serviceB } from './mock';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  serviceA.mockClear();
  serviceB.mockClear();
});

describe('EventHandler', () => {
  it('should be able to register a service at the construct time', async () => {
    const container = new Container(builder);
    container.get('serviceA');

    expect(serviceA).toHaveBeenCalledTimes(1);
  });

  it('should be able to register a service by calling register', async () => {
    const container = new Container({});
    container.register('serviceA', builder.serviceA);
    container.get('serviceA');

    expect(serviceA).toHaveBeenCalledTimes(1);
  });

  it('should be able to register an instance of a service by calling registerInstance', async () => {
    const container = new Container({});
    const aService = jest.fn();

    container.registerInstance('aService', aService);
    container.get('aService')();

    expect(aService).toHaveBeenCalledTimes(1);
  });

  it('should initialise a service only once', async () => {
    const container = new Container({});
    container.register('serviceA', builder.serviceA);
    container.get('serviceA');
    container.get('serviceA');
    container.get('serviceA');

    expect(serviceA).toHaveBeenCalledTimes(1);
  });

  it('should be able to get a service with its tag name', async () => {
    const newBuilder = { ...builder };
    newBuilder.serviceA.tags = ['test-tag-a', 'test-tag-b'];

    const container = new Container(newBuilder);
    container.getByTag('test-tag-a');

    expect(serviceA).toHaveBeenCalledTimes(1);
    expect(serviceB).toHaveBeenCalledTimes(0);
  });

  it('should be able to get multiple services with their tag name', async () => {
    const newBuilder = { ...builder };
    newBuilder.serviceA.tags = ['test-tag-a', 'test-tag-b'];
    newBuilder.serviceB.tags = ['test-tag-a'];

    const container = new Container(newBuilder);
    container.getByTag('test-tag-a');

    expect(serviceA).toHaveBeenCalledTimes(1);
    expect(serviceB).toHaveBeenCalledTimes(1);
  });

  it('should be able to boot services with tag name `boot`', async () => {
    const newBuilder = { ...builder };
    newBuilder.serviceA.tags = ['test-tag-a', 'boot'];
    newBuilder.serviceB.tags = ['test-tag-a'];

    const container = new Container(newBuilder);
    container.boot();

    expect(serviceA).toHaveBeenCalledTimes(1);
    expect(serviceB).toHaveBeenCalledTimes(0);
  });

  it('should throw error if it can not find a service', async () => {
    const container = new Container({});

    try {
      container.get('serviceA');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Service serviceA is not defined!');
    }
  });

  it.each([
    [null, NotFoundServiceSignature],
    [undefined, NotFoundServiceSignature],
    ['', NotFoundServiceSignature],
    [{ a: 'a' }, InvalidServiceSignature],
    // tslint:disable no-empty
    [{ constructor: () => { }, tags: {} }, InvalidServiceSignatureTags],
  ])
    ('should throw error if you pass invalid service signature', (serviceSignature, expectedError) => {
      const container = new Container({});

      try {
        container.register('service-name', serviceSignature);
        expect(true).toBeFalsy();
      } catch (e) {
        expect(e instanceof expectedError).toBeTruthy();
      }
    });
});
