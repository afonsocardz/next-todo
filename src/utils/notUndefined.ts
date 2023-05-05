export function notUndefined<T>(data: T[] | undefined): T[] {
  return data !== undefined ? data : ([] as T[]);
}
