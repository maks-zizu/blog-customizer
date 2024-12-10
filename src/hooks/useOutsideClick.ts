import { useEffect } from 'react';

/**
 * Хук для обработки кликов вне указанного элемента
 * @param ref - React Ref элемента
 * @param handler - Функция обработчика
 */
export const useOutsideClick = (
	ref: React.RefObject<HTMLElement>,
	handler: () => void
) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) handler();
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [ref, handler]);
};
