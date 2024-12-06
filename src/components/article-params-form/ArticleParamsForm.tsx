import { FC } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select/Select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggleOpen: () => void;
	formState: ArticleStateType;
	setFormState: (state: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	isOpen,
	onToggleOpen,
	formState,
	setFormState,
	onApply,
	onReset,
}) => {
	const handleFontFamilyChange = (
		option: (typeof fontFamilyOptions)[number]
	) => {
		setFormState({ ...formState, fontFamilyOption: option });
	};

	const handleFontColorChange = (option: (typeof fontColors)[number]) => {
		setFormState({ ...formState, fontColor: option });
	};

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
			<ArrowButton isOpen={isOpen} onClick={onToggleOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				role='dialog'>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<div className={styles.field}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							name='fontSizeOption'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleFontColorChange}
						/>
					</div>

					<Separator />

					<div className={styles.field}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleBgColorChange}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleContentWidthChange}
						/>
					</div>

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
