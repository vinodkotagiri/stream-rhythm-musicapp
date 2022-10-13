import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
	reducerPath: 'shazamCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
		prepareHeaders: (headers) => {
			headers.set(
				'X-RapidAPI-Key',
				'1e0631f39amsh3642090b31b60d9p141f0cjsnfb6bd915ff3f'
			)
			return headers
		},
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => '/charts/world' }),
		getSongDetails: builder.query({
			query: ({ songid }) => `/tracks/details?track_id=${songid}`,
		}),
		getSongsRelated: builder.query({
			query: ({ songid }) => `/tracks/related?track_id=${songid}`,
		}),
	}),
})

export const {
	useGetTopChartsQuery,
	useGetSongDetailsQuery,
	useGetSongsRelatedQuery,
} = shazamCoreApi
