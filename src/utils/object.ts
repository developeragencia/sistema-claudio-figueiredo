export function isEmptyObject(obj: object): boolean {
  return obj && Object.keys(obj).length === 0;
}

export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  return Object.keys(obj as object).reduce((acc, key) => {
    acc[key as keyof T] = deepClone((obj as any)[key]);
    return acc;
  }, {} as T);
}

export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (source && isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) {
          target[key] = {} as T[keyof T];
        }
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
  }

  return deepMerge(target, ...sources);
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = {} as Omit<T, K>;
  const keysSet = new Set(keys);

  Object.keys(obj).forEach(key => {
    if (!keysSet.has(key as K)) {
      result[key as keyof Omit<T, K>] = obj[key as keyof T];
    }
  });

  return result;
}

export function flatten(obj: Record<string, any>, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (isObject(obj[key])) {
      Object.assign(acc, flatten(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {} as Record<string, any>);
}

export function unflatten(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  Object.keys(obj).forEach(key => {
    const keys = key.split('.');
    let current = result;

    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        current[k] = obj[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    });
  });

  return result;
}

export function removeEmptyValues<T extends object>(obj: T): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T];
    if (value !== null && value !== undefined && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

export function removeNullValues<T extends object>(obj: T): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T];
    if (value !== null) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

export function removeUndefinedValues<T extends object>(obj: T): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T];
    if (value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

export function hasCircularReference(obj: object): boolean {
  const seen = new WeakSet();

  const detect = (obj: object): boolean => {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) return true;
      seen.add(obj);
      return Object.values(obj).some(value => {
        if (value && typeof value === 'object') {
          return detect(value);
        }
        return false;
      });
    }
    return false;
  };

  return detect(obj);
}

export function getObjectDiff<T extends Record<string, any>>(obj1: T, obj2: T): Partial<T> {
  return Object.keys(obj1).reduce((diff, key) => {
    if (obj2[key] === obj1[key]) return diff;
    return {
      ...diff,
      [key]: obj2[key]
    };
  }, {} as Partial<T>);
}

export function getObjectChanges<T extends Record<string, any>>(oldObj: T, newObj: T): {
  added: Partial<T>;
  removed: Partial<T>;
  updated: Partial<T>;
} {
  const added: Partial<T> = {};
  const removed: Partial<T> = {};
  const updated: Partial<T> = {};

  Object.keys(newObj).forEach(key => {
    if (!(key in oldObj)) {
      added[key] = newObj[key];
    } else if (oldObj[key] !== newObj[key]) {
      updated[key] = newObj[key];
    }
  });

  Object.keys(oldObj).forEach(key => {
    if (!(key in newObj)) {
      removed[key] = oldObj[key];
    }
  });

  return { added, removed, updated };
}

export function sortObjectKeys<T extends Record<string, any>>(obj: T): T {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as T);
}

export function mapObjectValues<T extends Record<string, any>, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U
): { [K in keyof T]: U } {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key as keyof T] = fn(obj[key], key as keyof T);
    return acc;
  }, {} as { [K in keyof T]: U });
}

export function filterObjectValues<T extends Record<string, any>>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  return Object.keys(obj).reduce((acc, key) => {
    if (fn(obj[key], key as keyof T)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
} 