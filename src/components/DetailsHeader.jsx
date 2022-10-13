import React from 'react'
import { Link } from 'react-router-dom'

const DetailsHeader = ({ artistId, songData, artistData }) => {
	return (
		<div className='relative w-full flex flex-col mb-6'>
			<div className='w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28' />
			<div className='absolute inset-0 flex items-center'>
				<img
					src={
						artistId
							? artistData?.artists[artistId].attributes?.artwork?.url
									.replace('{w}', '500')
									.replace('{h}', '500')
							: songData?.images?.coverart
					}
					alt='art'
					className='sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black'
				/>
				<div className='ml-5'>
					<p className='text-white font-bold sm:text-3xl text-xl'>
						{artistId
							? artistData?.artists[artistId].attributes.name
							: songData.title}
					</p>
					{!artistData && (
						<Link to={`/artists/${songData?.artists[0].adamid}`}>
							<p className='text-base tex-gray-400 mt-2'>
								{songData?.subtitle}
							</p>
						</Link>
					)}
					<p className='text-base text-gray-400 mt-2'>
						{artistId
							? artistData?.artists[artistId]?.genreNames[0]
							: songData?.genres?.primary}
					</p>
				</div>
			</div>
			<div className='w-full sm:h-44 h-24' />
		</div>
	)
}

export default DetailsHeader
