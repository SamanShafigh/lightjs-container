/**
 * Combine main and client service builders. Also check if client builders are not
 * overriding any main builder services. For example we will throw error if you have
 * a service with name `db` in mainBuilders, and also client have defined a service
 * with the same name
 *
 * @param mainBuilders
 * @param clientBuilders
 */
export function combine(mainBuilders: any, clientBuilders: any) {
  if (isDebug()) {
    Object.keys(clientBuilders).forEach((key) => {
      if (key in mainBuilders) {
        // tslint:disable no-console
        console.warn(`Service name ${key} is already in used and you are overiding it`);
      }
    });
  }

  return { ...mainBuilders, ...clientBuilders };
}

/**
 * Check if we are in debug mode
 */
export function isDebug(): boolean {
  if (process && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV !== 'production';
  }

  return false;
}
