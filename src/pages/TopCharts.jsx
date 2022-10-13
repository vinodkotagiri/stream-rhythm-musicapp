import React from 'react'
import { Error, Loader, SongCard } from '../components'
import { useSelector } from 'react-redux'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
const TopCharts = () => {
	const { activeSong, isPlaying } = useSelector((state) => state.player)
	const { data, isFetching, error } = useGetTopChartsQuery()

	if (isFetching) return <Loader title='Loading top charts...' />
	if (error) return <Error />

	return (
		<div className='flex flex-col'>
			<h2 className='text-3xl font-bold text-white nt-4 mb-10'>
				Discover Top Charts
			</h2>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{data?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
					/>
				))}
			</div>
		</div>
	)
}

export default TopCharts
