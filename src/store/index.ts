import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { NameSpace } from 'src/helpers/consts'
import { rtkQueryErrorLogger } from 'src/helpers/utils'
import { authReducer } from 'src/store/auth/auth.slice'
import { modalReducer } from 'src/modules/modal/store/modal.slice'
import { tableFiltrationReducer } from 'src/modules/table-filtration/store/table-filtration.slice'

import { authApi } from 'src/store/auth/auth.api'
import { objectsApi } from 'src/store/objects/objects.api'
import { projectsApi } from 'src/store/projects/projects.api'
import { newsApi } from 'src/store/news/news.api'
import { videosApi } from './videos/videos.api'
import { requestsApi } from './requests/requests.api'
import { eventsApi } from 'src/store/events/events.api'
import { culturesApi } from 'src/store/cultures/cultures.api'
import { siteSettingsApi } from 'src/store/site-settings/site-settings.api'
import { communityApi } from 'src/store/community/community.api'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[NameSpace.Auth]: authReducer,
		[NameSpace.Modal]: modalReducer,
		[NameSpace.TableFiltration]: tableFiltrationReducer,
		[objectsApi.reducerPath]: objectsApi.reducer,
		[projectsApi.reducerPath]: projectsApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		[videosApi.reducerPath]: videosApi.reducer,
		[requestsApi.reducerPath]: requestsApi.reducer,
		[eventsApi.reducerPath]: eventsApi.reducer,
		[culturesApi.reducerPath]: culturesApi.reducer,
		[siteSettingsApi.reducerPath]: siteSettingsApi.reducer,
		[communityApi.reducerPath]: communityApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			objectsApi.middleware,
			projectsApi.middleware,
			newsApi.middleware,
			videosApi.middleware,
			requestsApi.middleware,
			eventsApi.middleware,
			culturesApi.middleware,
			siteSettingsApi.middleware,
			authApi.middleware,
			communityApi.middleware,
			rtkQueryErrorLogger,
		),
})

setupListeners(store.dispatch)
