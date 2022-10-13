import React from 'react'
import { Error, Loader, SongCard } from '../components'
import { genres } from '../assets/constants'
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore'
import { useDispatch, useSelector } from 'react-redux'
import { selectGenreListId } from '../redux/features/playerSlice'
const Discover = () => {
	const dispatch = useDispatch()
	const { isPlaying, activeSong, genreListId } = useSelector(
		(state) => state.player
	)

	//Get Top Charts
	const { data, isFetching, error } = useGetSongsByGenreQuery(
		genreListId || 'POP'
	)

	const genreTitle = genres.find(({ value }) => value === genreListId).title
	if (isFetching) return <Loader title='Loading Songs...' />
	if (error) return <Error title='Error loading charts' />
	return (
		<div className='flex flex-col'>
			<div className='className w-full flex justify-between sm:flex-row flex-col mt-4 mb-10'>
				<h2 className='font-bold text-3xl text-white text-left'>
					Discover&nbsp;<q>{genreTitle}</q>
				</h2>
				<select
					onChange={(e) => {
						dispatch(selectGenreListId(e.target.value))
					}}
					value={genreListId || 'pop'}
					className='bg-black text-gray-300 px-2 text-sm text-center rounded-lg outline-none sm:mt-0 mt-5'>
					{genres.map((genre) => (
						<option key={genre.value} value={genre.value}>
							{genre.title}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-wrap gap-8 sm:justify-start justify-center'>
				{data?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						i={i}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
					/>
				))}
			</div>
		</div>
	)
}

export default Discover
