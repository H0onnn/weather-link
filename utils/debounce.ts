import { debounce as debounceFunc } from 'es-toolkit';

type DebounceCallback = () => void;

export const debounce = (callback: DebounceCallback, delay = 500) => debounceFunc(callback, delay);
