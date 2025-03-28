interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
  httpOnly?: boolean;
  maxAge?: number;
}

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      options.expires = date;
    }
    cookie += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookie += `; path=${options.path}`;
  }

  if (options.domain) {
    cookie += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookie += '; secure';
  }

  if (options.sameSite) {
    cookie += `; samesite=${options.sameSite.toLowerCase()}`;
  }

  if (options.httpOnly) {
    cookie += '; httponly';
  }

  if (options.maxAge) {
    cookie += `; max-age=${options.maxAge}`;
  }

  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  const encodedName = encodeURIComponent(name);

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === encodedName) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}

export function deleteCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0)
  });
}

export function getAllCookies(): Record<string, string> {
  return document.cookie
    .split(';')
    .reduce((cookies: Record<string, string>, cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      return cookies;
    }, {});
}

export function clearAllCookies(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  const cookies = getAllCookies();
  Object.keys(cookies).forEach(name => deleteCookie(name, options));
}

export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

export function updateCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (hasCookie(name)) {
    setCookie(name, value, options);
  }
}

export function parseCookie(cookieString: string): Record<string, string> {
  return cookieString
    .split(';')
    .reduce((cookies: Record<string, string>, cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      return cookies;
    }, {});
}

export function serializeCookie(name: string, value: string, options: CookieOptions = {}): string {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      options.expires = date;
    }
    cookie += `; Expires=${options.expires.toUTCString()}`;
  }

  if (options.maxAge) {
    cookie += `; Max-Age=${options.maxAge}`;
  }

  if (options.domain) {
    cookie += `; Domain=${options.domain}`;
  }

  if (options.path) {
    cookie += `; Path=${options.path}`;
  }

  if (options.secure) {
    cookie += '; Secure';
  }

  if (options.httpOnly) {
    cookie += '; HttpOnly';
  }

  if (options.sameSite) {
    cookie += `; SameSite=${options.sameSite}`;
  }

  return cookie;
}

export function isValidCookieName(name: string): boolean {
  return /^[\w!#$%&'*.^`|~+-]+$/.test(name);
}

export function isValidCookieValue(value: string): boolean {
  return !/[;\s]/.test(value);
}

export function getCookieExpirationDate(days: number): Date {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  return date;
}

export function isCookieExpired(expires: Date | number): boolean {
  const now = new Date();
  const expirationDate = typeof expires === 'number' ? getCookieExpirationDate(expires) : expires;
  return now > expirationDate;
}

export function getCookieDomain(): string {
  return window.location.hostname;
}

export function getCookiePath(): string {
  return window.location.pathname;
}

export function isSecureCookie(): boolean {
  return window.location.protocol === 'https:';
}

export function getCookieSize(name: string, value: string): number {
  return encodeURIComponent(name).length + encodeURIComponent(value).length;
}

export function isCookieSizeValid(name: string, value: string): boolean {
  const maxSize = 4096; // Maximum cookie size in bytes
  return getCookieSize(name, value) <= maxSize;
} 