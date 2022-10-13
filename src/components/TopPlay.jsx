import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const TopChartCard = ({ song, i }) => (
	<div className='w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg mb-2 cursor-pointer'>
		{song.title}
	</div>
)

const TopPlay = () => {
	const dispatch = useDispatch()

	const { activeSong, isPlaying } = useSelector((state) => state.player)

	const { data } = useGetTopChartsQuery()
	const divRef = useRef(null)

	const topPlays = data?.slice(0, 5)

	useEffect(() => {
		divRef.current.scrollIntoView({ behaviour: 'smooth' })
	}, [])

	const handlePlayClick = () => {
		dispatch(setActiveSong({}))
		dispatch(playPause(true))
	}

	const handlePauseClick = () => {
		dispatch(playPause(false))
	}

	return (
		<div
			ref={divRef}
			className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
			<div class='w-full flex flex-col'>
				<div className='flex flex-row justify-between items-center'>
					<h2 className='font-bold text-2xl text-white'>Top Charts</h2>
					<Link to='/top-charts'>
						<p className='text-gray-300 text-base cursor-pointer'>See More</p>
					</Link>
				</div>
				<div className='mt-4 flex flex-col gap-1'>
					{topPlays?.map((song, i) => (
						<TopChartCard song={song} i={i} key={song.key} />
					))}
				</div>
			</div>

			<div class='w-full flex flex-col mt-8'>
				<div className='flex flex-row justify-between items-center'>
					<h2 className='font-bold text-2xl text-white'>Top Artists</h2>
					<Link to='/top-charts'>
						<p className='text-gray-300 text-base cursor-pointer'>See More</p>
					</Link>
				</div>

				<Swiper
					slidesPerView='auto'
					spaceBetween={16}
					freeMode
					centeredSlides
					centeredSlidesBounds
					modules={[FreeMode]}
					className='mt-4'>
					{topPlays?.map((song, i) => (
						<SwiperSlide
							key={song.key}
							style={{ width: '25%', height: 'auto' }}
							className='shadow-lg rounded-full animate-slideright'>
							<Link to={`/artists/${song?.artists[0].adamid}`}>
								<img
									src={song?.images.background}
									alt='artist'
									className='rounded-full object-cover w-full'
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}

export default TopPlay
