import { type FileWithPreview } from './files'

export type ObjectNews = {
	id: string
	isHidden: boolean
	title: string
	tags: string[]
	isKey: boolean
	date: Date
}

export type ObjectEvents = {
	id: string
	isHidden: boolean
	title: string
	typeEvent: string
	typePart: string
	startDate: Date
	endDate: Date
}

export type ObjectItem = {
	id: string
	isHidden: boolean
	title: string
	type: string
	relation: string
	objectMainImg: FileWithPreview[]
	objectDesc: string
	objectDescFull: string
	phoneNumber?: string
	emailAddress?: string
	emailAddressFull: string
	tgText: string
	tgAddress?: string
	vkText: string
	vkAddress?: string
	coords: string
	news: ObjectNews[]
	events: ObjectEvents[]
	objectImages: FileWithPreview[]
}
