import localStorage from './localStorage';
import debounce from './debounce'
import throttle from './throttle'
import modal from './modal'
import fullScreen from './fullScreen';
import useLoop$ from './useLoop';
export const useLocalStorage = localStorage;
export const useDebounce = debounce;
export const useThrottle = throttle;
export const useModal = modal;
export const useFullScreen = fullScreen;
export const useLoop = useLoop$

