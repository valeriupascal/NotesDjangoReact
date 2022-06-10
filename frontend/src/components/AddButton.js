import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddSvg } from '../assets/add.svg'

const AddButton = () => {
  return (
    <Link to='/note/new' className='floating-button'>
        <AddSvg />
    </Link>
  )
}

export default AddButton