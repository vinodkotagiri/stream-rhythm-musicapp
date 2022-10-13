import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Error, Loader, SongCard } from '../components'
import { useSelector } from 'react-redux'
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore'
const AroundYou = () => {
	const [country, setCountry] = useState('')
	const [loading, setLoading] = useState(true)
	const { activeSong, isPlaying } = useSelector((state) => state.player)

	useEffect(() => {
		axios
			.get(
				'https://geo.ipify.org/api/v2/country?apiKey=at_9kL4kvsR0CPGdLYShlTnvzuTOZO5m'
			)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false))
	}, [country])

	const { data, isFetching, error } = useGetSongsByCountryQuery(country)

	if (isFetching && loading)
		return <Loader title='Loading songs around you...' />
	if (error) return <Error />

	return (
		<div className='flex flex-col'>
			<h2 className='text-3xl font-bold text-white nt-4 mb-10'>
				Around You&nbsp;
				<span className='font-black'>
					<q>{country}</q>
				</span>
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

export default AroundYou
