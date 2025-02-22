import { isEqual } from 'lodash';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeEmptyFromObjects(obj: any) {
  for (const key in obj) {
    if (
      (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) ||
      obj[key] === null ||
      obj[key] === undefined
    ) {
      delete obj[key];
    }
  }

  return obj;
}

export function useTableStore<T>(tableKey: string) {
  return create<{
    currentFilter: T;
    setQuery: (filter: T, isOverride?: boolean) => false | T;
    getQuery: () => T;
  }>()(
    persist(
      (set, get) => ({
        currentFilter: {} as T,
        setQuery: (filter: T, isOverride = false) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newSearch: any = removeEmptyFromObjects({ ...(isOverride ? {} : get().currentFilter), ...filter });
          if (newSearch.pageIndex) {
            newSearch.pageIndex = parseInt(newSearch.pageIndex);
            newSearch.pageSize = parseInt(newSearch.pageSize);
          }

          if (!isEqual(get().currentFilter, newSearch)) {
            set({
              currentFilter: newSearch,
            });
            console.log('Zustand update newSearch:', newSearch);

            return newSearch;
          }

          return false;
        },
        getQuery: () => {
          return get().currentFilter || ({} as T);
        },
      }),
      { name: `ac-table:${tableKey}` },
    ),
  );
}
