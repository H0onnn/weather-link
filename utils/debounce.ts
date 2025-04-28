import { debounce as debounceFunc } from 'es-toolkit';

type DebounceCallback = (...args: any[]) => void;

const DEBOUNCE_DELAY = 300;

export const debounce = (callback: DebounceCallback, delay = DEBOUNCE_DELAY) => debounceFunc(callback, delay);
