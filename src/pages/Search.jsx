import React from 'react'
import { Error, Loader, SongCard } from '../components'
import { useSelector } from 'react-redux'
import { useGetSongsBySearchTermQuery } from '../redux/services/shazamCore'
import { useParams } from 'react-router-dom'
const Search = () => {
	const { searchTerm } = useParams()

	const { activeSong, isPlaying } = useSelector((state) => state.player)
	const { data, isFetching, error } = useGetSongsBySearchTermQuery(searchTerm)

	if (isFetching) return <Loader title='Loading search results...' />
	if (error) return <Error />

	const songs = data?.tracks?.hits?.map((song) => song.track)
	return (
		<div className='flex flex-col'>
			<h2 className='text-3xl font-bold text-white nt-4 mb-10'>
				Showing Results for&nbsp;<q>{searchTerm}</q>
			</h2>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{songs?.map((song, i) => (
					<SongCard
						i={i}
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
					/>
				))}
			</div>
		</div>
	)
}

export default Search
