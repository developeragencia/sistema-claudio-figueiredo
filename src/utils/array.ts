export function chunk<T>(array: T[], size: number): T[][] {
  return array.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / size);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, [] as T[][]);
}

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const group = String(item[key]);
    return {
      ...result,
      [group]: [...(result[group] || []), item]
    };
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === valueB) return 0;
    if (valueA === null || valueA === undefined) return 1;
    if (valueB === null || valueB === undefined) return -1;

    const comparison = valueA < valueB ? -1 : 1;
    return order === 'asc' ? comparison : -comparison;
  });
}

export function filterBy<T>(array: T[], key: keyof T, value: any): T[] {
  return array.filter(item => {
    const itemValue = item[key];
    if (typeof value === 'string') {
      return String(itemValue).toLowerCase().includes(value.toLowerCase());
    }
    return itemValue === value;
  });
}

export function paginate<T>(array: T[], page: number, limit: number): T[] {
  const start = (page - 1) * limit;
  const end = start + limit;
  return array.slice(start, end);
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function range(start: number, end: number, step = 1): number[] {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
}

export function sum(array: number[]): number {
  return array.reduce((total, value) => total + value, 0);
}

export function average(array: number[]): number {
  return array.length > 0 ? sum(array) / array.length : 0;
}

export function min(array: number[]): number {
  return Math.min(...array);
}

export function max(array: number[]): number {
  return Math.max(...array);
}

export function intersection<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => array2.includes(item));
}

export function difference<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => !array2.includes(item));
}

export function union<T>(array1: T[], array2: T[]): T[] {
  return unique([...array1, ...array2]);
}

export function flatten<T>(array: T[][]): T[] {
  return array.reduce((flat, current) => [...flat, ...current], []);
}

export function flattenDeep<T>(array: any[]): T[] {
  return array.reduce((flat, current) => {
    if (Array.isArray(current)) {
      return [...flat, ...flattenDeep(current)];
    }
    return [...flat, current];
  }, []);
}

export function compact<T>(array: T[]): T[] {
  return array.filter(Boolean);
}

export function partition<T>(array: T[], predicate: (item: T) => boolean): [T[], T[]] {
  return array.reduce(
    ([pass, fail], item) => {
      return predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]];
    },
    [[], []] as [T[], T[]]
  );
}

export function sample<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function sampleSize<T>(array: T[], n: number): T[] {
  return shuffle(array).slice(0, n);
}

export function countBy<T>(array: T[], key: keyof T): Record<string, number> {
  return array.reduce((result, item) => {
    const value = String(item[key]);
    return {
      ...result,
      [value]: (result[value] || 0) + 1
    };
  }, {} as Record<string, number>);
}

export function findDuplicates<T>(array: T[]): T[] {
  return array.filter((item, index) => array.indexOf(item) !== index);
}

export function findDuplicatesBy<T>(array: T[], key: keyof T): T[] {
  const counts = countBy(array, key);
  return array.filter(item => counts[String(item[key])] > 1);
}

export function removeAt<T>(array: T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function insertAt<T>(array: T[], index: number, item: T): T[] {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

export function updateAt<T>(array: T[], index: number, item: T): T[] {
  return [...array.slice(0, index), item, ...array.slice(index + 1)];
}

export function move<T>(array: T[], from: number, to: number): T[] {
  const result = [...array];
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);
  return result;
}

export function rotate<T>(array: T[], n: number): T[] {
  const len = array.length;
  const normalizedN = ((n % len) + len) % len;
  return [...array.slice(normalizedN), ...array.slice(0, normalizedN)];
}

export function zip<T, U>(array1: T[], array2: U[]): [T, U][] {
  const length = Math.min(array1.length, array2.length);
  return Array.from({ length }, (_, i) => [array1[i], array2[i]]);
}

export function unzip<T, U>(array: [T, U][]): [T[], U[]] {
  return array.reduce(
    ([arr1, arr2], [item1, item2]) => {
      arr1.push(item1);
      arr2.push(item2);
      return [arr1, arr2];
    },
    [[], []] as [T[], U[]]
  );
} 