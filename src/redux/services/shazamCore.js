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
		getSongsByGenre: builder.query({
			query: (genre) => `/charts/genre-world?genre_code=${genre}`,
		}),
		getSongsBySearchTerm: builder.query({
			query: (searchTerm) =>
				`/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
		}),
		getTopCharts: builder.query({ query: () => '/charts/world' }),

		getSongDetails: builder.query({
			query: ({ songid }) => `/tracks/details?track_id=${songid}`,
		}),
		getSongsRelated: builder.query({
			query: ({ songid }) => `/tracks/related?track_id=${songid}`,
		}),
		getArtistDetails: builder.query({
			query: (artistId) => `/artists/details?artist_id=${artistId}`,
		}),
		getSongsByCountry: builder.query({
			query: (country) => `/charts/country?country_code=${country}`,
		}),
	}),
})

export const {
	useGetSongsByGenreQuery,
	useGetSongsBySearchTermQuery,
	useGetTopChartsQuery,
	useGetSongDetailsQuery,
	useGetSongsRelatedQuery,
	useGetArtistDetailsQuery,
	useGetSongsByCountryQuery,
} = shazamCoreApi
