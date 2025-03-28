export function getQueryParams(url: string): Record<string, string> {
  const params = new URLSearchParams(url.split('?')[1]);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}

export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export function addQueryParams(url: string, params: Record<string, string | number | boolean>): string {
  const [baseUrl, existingQuery] = url.split('?');
  const existingParams = existingQuery ? getQueryParams(`?${existingQuery}`) : {};
  
  const newParams = {
    ...existingParams,
    ...params
  };
  
  return baseUrl + buildQueryString(newParams);
}

export function removeQueryParams(url: string, paramsToRemove: string[]): string {
  const [baseUrl, query] = url.split('?');
  if (!query) return url;
  
  const params = new URLSearchParams(query);
  paramsToRemove.forEach(param => params.delete(param));
  
  const newQuery = params.toString();
  return newQuery ? `${baseUrl}?${newQuery}` : baseUrl;
}

export function updateQueryParams(url: string, params: Record<string, string | number | boolean>): string {
  const [baseUrl, query] = url.split('?');
  const existingParams = query ? getQueryParams(`?${query}`) : {};
  
  const updatedParams = {
    ...existingParams,
    ...params
  };
  
  Object.entries(updatedParams).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      delete updatedParams[key];
    }
  });
  
  return baseUrl + buildQueryString(updatedParams);
}

export function getPathSegments(url: string): string[] {
  const urlObj = new URL(url);
  return urlObj.pathname.split('/').filter(Boolean);
}

export function joinPaths(...paths: string[]): string {
  return paths
    .map(path => path.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isAbsoluteUrl(url: string): boolean {
  return /^[a-z][a-z\d+\-.]*:/.test(url);
}

export function getBaseUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
  } catch {
    return '';
  }
}

export function getPathname(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return '';
  }
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

export function getProtocol(url: string): string {
  try {
    return new URL(url).protocol;
  } catch {
    return '';
  }
}

export function getHash(url: string): string {
  try {
    return new URL(url).hash;
  } catch {
    return '';
  }
}

export function removeHash(url: string): string {
  const hashIndex = url.indexOf('#');
  return hashIndex !== -1 ? url.slice(0, hashIndex) : url;
}

export function addHash(url: string, hash: string): string {
  const urlWithoutHash = removeHash(url);
  const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`;
  return `${urlWithoutHash}${normalizedHash}`;
}

export function isExternalUrl(url: string, baseUrl: string): boolean {
  try {
    const urlObj = new URL(url, baseUrl);
    const baseUrlObj = new URL(baseUrl);
    return urlObj.origin !== baseUrlObj.origin;
  } catch {
    return false;
  }
}

export function normalizeUrl(url: string): string {
  try {
    return new URL(url).toString();
  } catch {
    return url;
  }
}

export function encodeQueryParam(param: string): string {
  return encodeURIComponent(param).replace(/%20/g, '+');
}

export function decodeQueryParam(param: string): string {
  return decodeURIComponent(param.replace(/\+/g, ' '));
}

export function getUrlWithoutQuery(url: string): string {
  const [baseUrl] = url.split('?');
  return baseUrl;
}

export function getUrlWithoutQueryAndHash(url: string): string {
  return getUrlWithoutQuery(removeHash(url));
}

export function isValidPath(path: string): boolean {
  return /^[\w\-./]+$/.test(path);
}

export function sanitizePath(path: string): string {
  return path.replace(/[^\w\-./]/g, '');
}

export function resolvePath(from: string, to: string): string {
  if (to.startsWith('/')) return to;
  
  const segments = from.split('/');
  segments.pop();
  
  to.split('/').forEach(segment => {
    if (segment === '..') {
      segments.pop();
    } else if (segment !== '.') {
      segments.push(segment);
    }
  });
  
  return segments.join('/');
} 