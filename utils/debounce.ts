import { debounce as debounceFunc } from 'es-toolkit';

type DebounceCallback = () => void;

const DEBOUNCE_DELAY = 500;

export const debounce = (callback: DebounceCallback, delay = DEBOUNCE_DELAY) => debounceFunc(callback, delay);
