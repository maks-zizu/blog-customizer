import { FC, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Button } from 'src/ui/button';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select/Select';
import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	articleState,
	setArticleState,
}) => {
	const [formState, setFormState] = useState(articleState);
	const [isOpen, setIsOpen] = useState(false);

	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClick(formRef, () => {
		if (isOpen) setIsOpen(false);
	});

	const onToggleSidebar = () => {
		if (!isOpen) setFormState(articleState);
		setIsOpen(!isOpen);
	};

	const onApply = () => {
		setArticleState(formState);
		setIsOpen(false);
	};

	const onReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};

	const handleFontFamilyChange = (option: (typeof fontFamilyOptions)[number]) =>
		setFormState({ ...formState, fontFamilyOption: option });

	const handleFontColorChange = (option: (typeof fontColors)[number]) =>
		setFormState({ ...formState, fontColor: option });

	const handleBgColorChange = (option: (typeof backgroundColors)[number]) =>
		setFormState({ ...formState, backgroundColor: option });

	const handleContentWidthChange = (option: (typeof contentWidthArr)[number]) =>
		setFormState({ ...formState, contentWidth: option });

	const handleFontSizeChange = (option: (typeof fontSizeOptions)[number]) =>
		setFormState({ ...formState, fontSizeOption: option });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggleSidebar} />
			<aside
				role='dialog'
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='fontSizeOption'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBgColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
