import {
	type CultureInfoInputs,
	cultureInfoSchema,
} from 'src/pages/culture-element-layout/pages/culture-info/schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const CultureInfo = () => {
	const methods = useForm<CultureInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(cultureInfoSchema),
		defaultValues: {
			directionLogo: [],
			galleryImages: [],
		},
	})

	const onSubmit: SubmitHandler<CultureInfoInputs> = (data) => {
		console.log(data)
	}
	return (
		<>
			<Helmet>
				<title>Информация</title>
			</Helmet>
			<AdminContent className={styles.cultureInfoPage}>
				<Link
					to={`/${AdminRoute.AdminAtmans}/${AdminRoute.AdminAtmansCulture}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку элементов
				</Link>
				<h3>Информация</h3>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<ControlledInput name='directionTitle' label='Наименование направления *' />
						<ControlledSelect
							className={styles.cultureSelect}
							selectOptions={[
								{ label: 'Государство', value: '1' },
								{ label: 'Уровень 2', value: '2' },
								{ label: 'Уровень 3', value: '3' },
							]}
							name='levelDirection'
							label='Уровень направления *'
						/>
						<ControlledSelect
							className={styles.cultureSelect}
							selectOptions={[
								{ label: 'Россия', value: '1' },
								{ label: 'Регион 2', value: '2' },
								{ label: 'Регион 3', value: '3' },
							]}
							name='regionDirection'
							label='Регион направления *'
						/>
						<ControlledInput name='site' label='Адрес интернет-сайта *' />
						<ReactDropzone
							label='Логотип направления *'
							name='directionLogo'
							prompt='JPEG, PNG, 500х500px, не более 2.5 Мб'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							margin='0 0 20px 0'
						/>
						<QuillEditor name='firstText' label='Первый текстовый блок' />
						<ReactDropzone
							previewVariant='list'
							name='galleryImages'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							maxFiles={16}
							multiple
							customUploadBtn={<AddButton>Добавить фото</AddButton>}
						/>
						<QuillEditor name='secondText' label='Второй текстовый блок' />
						<ControlledCheckbox
							name='isEventsByDisciplines'
							label='Транслировать события по дисциплинам'
							type='checkbox'
						/>
						<ControlledCheckbox
							name='isParticipantsByDisciplines'
							label='Транслировать участников по дисциплинам'
							type='checkbox'
						/>
						<ControlledCheckbox
							name='isParticipantsByEvents'
							label='Транслировать участников по событиям'
							type='checkbox'
						/>
						<AdminControllers outLink={AdminRoute.AdminHome} />
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
