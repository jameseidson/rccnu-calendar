import { readable, type StartStopNotifier } from "svelte/store";

export const awaitable = <T>(start?: StartStopNotifier<T>) => {
  const { subscribe } = readable<T>(undefined, start);

  const known = new Promise<void>((resolve) => {
    let unsubscribe = subscribe((val) => {
      if (val !== undefined) {
        resolve();
        unsubscribe();
      }
    });
  });

  return { subscribe, known };
};
