import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useEffect, useRef, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const mainRef = useRef<HTMLDivElement>(null);

	// Обработчик клика вне сайдбара для закрытия
	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (
				isSidebarOpen &&
				mainRef.current &&
				!mainRef.current.contains(e.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isSidebarOpen]);

	const onToggleSidebar = () => {
		// При открытии сайдбара синхронизируем formState с текущим состоянием статьи,
		// чтобы при повторном открытии были актуальные значения
		if (!isSidebarOpen) {
			setFormState(articleState);
		}
		setIsSidebarOpen(!isSidebarOpen);
	};

	const onApply = () => {
		setArticleState(formState);
		setIsSidebarOpen(false);
	};

	const onReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsSidebarOpen(false);
	};

	const mainStyles: CSSProperties = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={mainStyles} ref={mainRef}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggleOpen={onToggleSidebar}
				formState={formState}
				setFormState={setFormState}
				onApply={onApply}
				onReset={onReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
