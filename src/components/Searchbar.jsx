import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		if (searchTerm) navigate(`/search/${searchTerm}`)
		setSearchTerm('')
	}
	return (
		<form
			onSubmit={handleSubmit}
			autoComplete='off'
			className='p-2 text-gray-400 focus-within:text-gray-600'>
			<label htmlFor='search-field' className='sr-only'>
				search all songs
			</label>
			<div className='flex flex-row justify-start items-center'>
				<FiSearch
					className='w-5 h-5 ml-4 cursor-pointer'
					onClick={handleSubmit}
				/>
				<input
					name='search-field'
					autoComplete='off'
					placeholder='Search'
					id='search-field'
					type='search'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4'
				/>
			</div>
		</form>
	)
}

export default Searchbar
