import {
	type ObjectNews,
	type ObjectEvents,
	type ObjectsResponse,
	type ObjectNewsResponse,
} from 'src/types/objects'
import { type FieldValues } from 'react-hook-form'

import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const objectsApi = createApi({
	reducerPath: ReducerPath.Objects,
	tagTypes: ['Object', 'ObjectInfo', 'ObjectNews', 'ObjectEvents'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllObjects: build.query<ObjectsResponse, { title: string; type: string; relation: string }>({
			query: ({ title = '', type = '', relation = '' }) => ({
				url: `objects/list`,
				params: {
					title,
					type,
					relation,
				},
			}),
			providesTags: ['Object'],
		}),

		deleteObjectById: build.mutation<null, string>({
			query: (objectId) => ({
				url: `objects/list/delete`,
				method: 'DELETE',
				body: { id: objectId },
			}),
			invalidatesTags: ['Object'],
		}),
		hideObjectById: build.mutation<null, string>({
			query: (objectId) => ({
				url: `objects/list/hide`,
				method: 'POST',
				body: { id: objectId },
			}),
			invalidatesTags: ['Object'],
		}),

		saveObjectDescription: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `objects/save_description`,
				method: 'POST',
				body: formData,
			}),
		}),

		getObjectInfo: build.query<ObjectsResponse, string>({
			query: (id) => ({
				url: `objects/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['ObjectInfo'],
		}),
		saveObjectInfo: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `objects/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['ObjectInfo'],
		}),
		getNewsByObjectId: build.query<
			ObjectNews[],
			{ id?: string; title?: string; date?: string; tags?: string }
		>({
			query: ({ id = '', title = '', date = '', tags = '' }) => ({
				url: `objects/news/list`,
				params: {
					id,
					title,
					date,
					tags,
				},
			}),
			transformResponse: (response: ObjectNewsResponse) => response.news,
			providesTags: ['ObjectNews'],
		}),

		getEventsByObjectId: build.query<ObjectEvents[], { id: string | undefined; search?: string }>({
			query: ({ id: objId, search }) => ({
				url: `objects/${objId}/events`,
				params: {
					q: search,
				},
			}),
			providesTags: ['ObjectEvents'],
		}),

		deleteObjectNewsById: build.mutation<null, string>({
			query: (newsId) => ({
				url: `/objects/news/delete`,
				method: 'DELETE',
				body: { id: newsId },
			}),
			invalidatesTags: ['ObjectNews'],
		}),
		hideObjectNewsById: build.mutation<null, string>({
			query: (newsId) => ({
				url: `/objects/news/hide`,
				method: 'POST',
				body: { id: newsId },
			}),
			invalidatesTags: ['ObjectNews'],
		}),
		deleteObjectEventsById: build.mutation<null, { objectId: string; eventId: string }>({
			query: ({ objectId, eventId }) => ({
				url: `/object/${objectId}/eventDelete/${eventId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['ObjectEvents'],
		}),
	}),
})

export const {
	useGetAllObjectsQuery,
	useDeleteObjectByIdMutation,
	useHideObjectByIdMutation,
	useSaveObjectDescriptionMutation,
	useGetObjectInfoQuery,
	useSaveObjectInfoMutation,
	useGetNewsByObjectIdQuery,
	useDeleteObjectNewsByIdMutation,
	useGetEventsByObjectIdQuery,
	useDeleteObjectEventsByIdMutation,
	useHideObjectNewsByIdMutation,
} = objectsApi
