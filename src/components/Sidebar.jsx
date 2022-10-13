import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { logo } from '../assets'
import { links } from '../assets/constants'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'

const Sidebar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const NavLinks = ({ handleClick }) => {
		return (
			<div className='mt-4 px-10'>
				{links.map((item) => (
					<NavLink
						key={item.name}
						to={item.to}
						onClick={() => handleClick && handleClick()}
						className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'>
						<item.icon className='w-6 h-6 mr-2' />
						{item.name}
					</NavLink>
				))}
			</div>
		)
	}

	return (
		<Fragment>
			{/* LARGE SCREEN MENU */}
			<div className='md:flex hidden flex-col w-[240px] p-3 bg-[#191624]'>
				<img src={logo} alt='logo' className='' />
				<hr className='h-0.5 bg-[#6741d9]' />
				<NavLinks />
			</div>

			{/* MOBILE MENU */}
			<div className='absolute md:hidden block top-6 right-3'>
				{mobileMenuOpen ? (
					<RiCloseLine
						className='w-6 h-6 text-white mr-2'
						onClick={() => setMobileMenuOpen(false)}
					/>
				) : (
					<HiOutlineMenu
						className='w-6 h-6 text-white mr-2 z-100'
						onClick={() => setMobileMenuOpen(true)}
					/>
				)}
			</div>
			<div
				className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483db8] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
					mobileMenuOpen ? 'left-0' : '-left-full'
				}`}>
				<img src={logo} alt='logo' className='' />
				<hr className='h-0.5 bg-[#6741d9]' />
				<NavLinks
					handleClick={() => {
						setMobileMenuOpen(false)
						console.log(mobileMenuOpen)
					}}
				/>
			</div>
		</Fragment>
	)
}

export default Sidebar
