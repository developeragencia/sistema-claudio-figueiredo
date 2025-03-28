interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiry?: number;
}

export function setItem<T>(key: string, value: T, expiry?: number): void {
  try {
    const item: StorageItem<T> = {
      value,
      timestamp: Date.now(),
      expiry
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem: StorageItem<T> = JSON.parse(item);
    
    if (parsedItem.expiry && Date.now() > parsedItem.timestamp + parsedItem.expiry) {
      removeItem(key);
      return null;
    }

    return parsedItem.value;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

export function getAllKeys(): string[] {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting keys from localStorage:', error);
    return [];
  }
}

export function getAllItems(): Record<string, any> {
  try {
    return getAllKeys().reduce((items, key) => {
      items[key] = getItem(key);
      return items;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error('Error getting all items from localStorage:', error);
    return {};
  }
}

export function hasItem(key: string): boolean {
  return getItem(key) !== null;
}

export function updateItem<T>(key: string, value: T, expiry?: number): void {
  if (hasItem(key)) {
    setItem(key, value, expiry);
  }
}

export function getItemTimestamp(key: string): number | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem: StorageItem<any> = JSON.parse(item);
    return parsedItem.timestamp;
  } catch (error) {
    console.error('Error getting item timestamp from localStorage:', error);
    return null;
  }
}

export function isItemExpired(key: string): boolean {
  try {
    const item = localStorage.getItem(key);
    if (!item) return true;

    const parsedItem: StorageItem<any> = JSON.parse(item);
    if (!parsedItem.expiry) return false;

    return Date.now() > parsedItem.timestamp + parsedItem.expiry;
  } catch (error) {
    console.error('Error checking item expiry in localStorage:', error);
    return true;
  }
}

export function removeExpiredItems(): void {
  try {
    getAllKeys().forEach(key => {
      if (isItemExpired(key)) {
        removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error removing expired items from localStorage:', error);
  }
}

export function getStorageSize(): number {
  try {
    return getAllKeys().reduce((size, key) => {
      return size + (localStorage.getItem(key)?.length || 0) * 2; // UTF-16 characters are 2 bytes each
    }, 0);
  } catch (error) {
    console.error('Error calculating localStorage size:', error);
    return 0;
  }
}

export function getRemainingSpace(): number {
  try {
    const maxSize = 5 * 1024 * 1024; // 5MB is a common localStorage limit
    return maxSize - getStorageSize();
  } catch (error) {
    console.error('Error calculating remaining localStorage space:', error);
    return 0;
  }
}

export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function setItemWithRetry<T>(key: string, value: T, expiry?: number, maxRetries = 3): boolean {
  for (let i = 0; i < maxRetries; i++) {
    try {
      setItem(key, value, expiry);
      return true;
    } catch (error) {
      if (i === maxRetries - 1) {
        console.error('Max retries reached while saving to localStorage:', error);
        return false;
      }
      // On error, try to free up space by removing expired items
      removeExpiredItems();
    }
  }
  return false;
}

export function getItemWithDefault<T>(key: string, defaultValue: T): T {
  const value = getItem<T>(key);
  return value === null ? defaultValue : value;
}

export function setJSON<T>(key: string, value: T, expiry?: number): void {
  try {
    setItem(key, JSON.stringify(value), expiry);
  } catch (error) {
    console.error('Error saving JSON to localStorage:', error);
  }
}

export function getJSON<T>(key: string): T | null {
  try {
    const value = getItem<string>(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return null;
  }
}

export function setMultipleItems(items: Record<string, any>, expiry?: number): void {
  try {
    Object.entries(items).forEach(([key, value]) => {
      setItem(key, value, expiry);
    });
  } catch (error) {
    console.error('Error saving multiple items to localStorage:', error);
  }
}

export function removeMultipleItems(keys: string[]): void {
  try {
    keys.forEach(key => removeItem(key));
  } catch (error) {
    console.error('Error removing multiple items from localStorage:', error);
  }
}

export function getMultipleItems(keys: string[]): Record<string, any> {
  try {
    return keys.reduce((items, key) => {
      items[key] = getItem(key);
      return items;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error('Error getting multiple items from localStorage:', error);
    return {};
  }
} 