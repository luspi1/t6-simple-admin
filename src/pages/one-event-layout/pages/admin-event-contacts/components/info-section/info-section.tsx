import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { GridRow } from 'src/components/grid-row/grid-row'
import { CustomText } from 'src/components/custom-text/custom-text'

export const InfoSection = () => {
	return (
		<AdminSection>
			<ControlledInput
				name='site'
				label='Интернет-сайт'
				placeholder='Полное название события'
				margin='0 0 20px 0'
			/>
			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Контактный телефон
			</CustomText>
			<GridRow
				$alignItems='center'
				$gap='30px'
				$mdGap='5px'
				$margin='0 0 20px 0'
				$template='auto / 0.35fr 0.65fr'
			>
				<ControlledMaskedInput
					name='phone'
					placeholder='+7 (999) 999-00-00'
					mask='{+7} (000) 000-00-00'
				/>
				<SwitchedRadioBtns
					name='isShowPhone'
					contentRadio1='Показать всем'
					contentRadio2='Скрыть'
				/>
			</GridRow>
			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Телеграм-канал
			</CustomText>
			<GridRow
				$alignItems='center'
				$gap='30px'
				$mdGap='5px'
				$margin='0 0 20px 0'
				$template='auto / 0.35fr 0.65fr'
			>
				<ControlledInput name='tgChannel' placeholder='Полное название события' />
				<SwitchedRadioBtns
					name='isShowTgChannel'
					contentRadio1='Показать всем'
					contentRadio2='Скрыть'
				/>
			</GridRow>
			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Контактный e-mail
			</CustomText>
			<GridRow $alignItems='center' $gap='30px' $mdGap='5px' $template='auto / 0.35fr 0.65fr'>
				<ControlledInput name='email' placeholder='адрес электронной почты' />
				<SwitchedRadioBtns
					name='isShowEmail'
					contentRadio1='Показать всем'
					contentRadio2='Скрыть'
				/>
			</GridRow>
		</AdminSection>
	)
}
