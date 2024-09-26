import React from 'react'
import '../Css/dropdown.css'
const dropdown = () => {
  return (
    <div>
        <ul className='flex flex-col gap-4 dropdown'>
            <li>Profile</li>
            <li>SignUp</li>
            <li>Logout</li>
        </ul>
       
       
    </div>
  )
}

export default dropdown;