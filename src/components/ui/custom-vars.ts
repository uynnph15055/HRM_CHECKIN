type GetObjDifferentKeys<
  T,
  U,
  T0 = Omit<T, keyof U> & Omit<U, keyof T>,
  T1 = {
    [K in keyof T0]: T0[K];
  },
> = T1;

type GetObjSameKeys<T, U> = Omit<T | U, keyof GetObjDifferentKeys<T, U>>;

type MergeTwoObjects<
  T,
  U,
  T0 = GetObjDifferentKeys<T, U> & { [K in keyof GetObjSameKeys<T, U>]: DeepMergeTwoTypes<T[K], U[K]> },
  T1 = { [K in keyof T0]: T0[K] },
> = T1;

export type DeepMergeTwoTypes<T, U> = [T, U] extends [{ [key: string]: unknown }, { [key: string]: unknown }]
  ? MergeTwoObjects<NonNullable<T>, NonNullable<U>>
  : NonNullable<T> | NonNullable<U>;

function _deepMerge<T extends object, U extends object>(target: T, source: U): DeepMergeTwoTypes<T, U> {
  for (const key of Object.keys(source) as Array<keyof U>) {
    if (source[key] instanceof Object && key in target) {
      (target as any)[key] = _deepMerge((target as any)[key], source[key] as any);
    } else {
      (target as any)[key] = source[key];
    }
  }

  return target as any;
}

export function mergeVariants<T, U>(baseConfig: T, customConfig: U): DeepMergeTwoTypes<T, U> {
  return _deepMerge(baseConfig as any, customConfig as any) as any;
}

export const customVars = {
  button: {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        success: 'bg-success text-white hover:bg-success/80',
        secondary: 'bg-secondary text-white hover:bg-secondary/80',
        info: 'bg-info text-white hover:bg-info/80',
      },
    },
  },
};
