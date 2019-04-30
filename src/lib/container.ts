export * from './helper';
import {
  InvalidServiceSignature,
  InvalidServiceSignatureTags,
  NotFoundServiceSignature,
} from './error';

export default class Container {
  private services: any;

  /**
   *
   * @param builder Service builders
   */
  constructor(builders: any) {
    this.services = new Map();
    if (builders !== undefined) {
      Object.keys(builders).forEach((name) => this.register(name, builders[name]));
    }
  }

  /**
   * Register a service
   *
   * @param name
   * @param sig service signature
   */
  public register(name: string, sig: any) {
    this.validateSig(name, sig);
    this.services.set(name, { sig, instance: null });
  }

  /**
   * Register an instance of a service
   *
   * @param name
   * @param instance
   */
  public registerInstance(name: string, instance: any) {
    this.services.set(name, { sig: null, instance });
  }

  /**
   * Get a service
   *
   * @param name
   * @returns any|undefined
   */
  public get(name: string): any {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} is not defined!`);
    }

    if (service.instance !== null) {
      return service.instance;
    }

    const instance = this.buildService(service);
    this.services.set(name, { sig: service.sig, instance });

    return instance;
  }

  /**
   * Get all services having this <tag>
   *
   * @param tag
   */
  public getByTag(tag: string) {
    const instances: any[] = [];
    this.services.forEach((service: any, name: string) => {
      const sig = service.sig;
      if (sig && sig.tags !== undefined && sig.tags.includes(tag)) {
        instances.push(this.get(name));
      }
    });

    return instances;
  }

  /**
   * Boot all services that need to be boot
   */
  public async boot() {
    const bootP: any = [];
    this.services.forEach((service: any, name: string) => {
      const sig = service.sig;
      if (sig && sig.tags !== undefined && sig.tags.includes('boot')) {
        if (typeof this.get(name).boot === 'function') {
          bootP.push(this.get(name).boot(this));
        }
      }
    });

    return Promise.all(bootP).then(() => {
      this.services.forEach((service: any, name: string) => {
        const sig = service.sig;
        if (sig && typeof sig.postBoot === 'function') {
          sig.postBoot(this);
        }
      });
    });
  }

  /**
   * Build a service instance
   *
   * @param service
   */
  private buildService(service: any) {
    return service.sig.constructor(this);
  }

  /**
   *
   * @param sig
   */
  private validateSig(name: string, sig: any) {
    if (!sig || typeof sig !== 'object') {
      throw new NotFoundServiceSignature(name);
    }

    if (!sig.hasOwnProperty('constructor')) {
      throw new InvalidServiceSignature(name);
    }

    if (sig.hasOwnProperty('tags') && !Array.isArray(sig.tags)) {
      throw new InvalidServiceSignatureTags(name);
    }
  }
}
