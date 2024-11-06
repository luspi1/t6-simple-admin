import { type FC } from 'react'

import {
	type CommunityDocumentsInputs,
	communityDocumentsSchema,
} from 'src/pages/community-layout/pages/admin-community-documents/schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import { TitleSection } from 'src/pages/community-layout/pages/admin-community-documents/components/title-section/title-section'
import { MainDocSection } from 'src/pages/community-layout/pages/admin-community-documents/components/main-doc-section/main-doc-section'
import { RulesSection } from 'src/pages/community-layout/pages/admin-community-documents/components/rules-section/rules-section'
import { LawsSection } from 'src/pages/community-layout/pages/admin-community-documents/components/laws-section/laws-section'

export const AdminCommunityDocuments: FC = () => {
	const methods = useForm<CommunityDocumentsInputs>({
		mode: 'onBlur',
		resolver: yupResolver(communityDocumentsSchema),
		defaultValues: {
			mainDocPdf: [],
			mainDocDocx: [],
			rulesSection: true,
			rulesDocs: [{ ruleTitle: '', ruleVersion: '', rulePdf: [], ruleDocx: [] }],
			lawsSection: true,
			lawsDocs: [
				{
					lawTitle: '',
					lawVersion: '',
					lawDocLink: '',
					lawDocSource: '',
					lawDocFile: [],
				},
			],
		},
	})

	const onSubmit: SubmitHandler<CommunityDocumentsInputs> = (data) => {
		console.log(data)
	}
	return (
		<>
			<Helmet>
				<title>Документы</title>
			</Helmet>
			<AdminContent title='Документы' link='#'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<TitleSection />
						<MainDocSection />
						<RulesSection />
						<LawsSection />
						<AdminControllers outLink={AdminRoute.AdminHome} />
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
