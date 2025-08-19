interface StorageOptions<T> {
  defaultValue: T;
}

export function storage<T>(storageId: string, options: StorageOptions<T>) {
  let item: T;

  const init = () => {
    const raw = localStorage.getItem(storageId);
    if (raw) {
      try {
        item = JSON.parse(raw);
      } catch {
        item = options.defaultValue;
        set(options.defaultValue);
      }
    } else {
      item = options.defaultValue;
      set(options.defaultValue);
    }
  };

  const get = (): T => {
    if (item === undefined) init();
    return item;
  };

  const set = (value: T) => {
    item = value;
    localStorage.setItem(storageId, JSON.stringify(value));
  };

  const reset = () => {
    set(options.defaultValue);
  };

  // 기본 API
  return { get, set, reset };
}
