import { useState, useEffect } from 'react'
import { Toggle } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { ApiUserStatus } from '@/services/api'

export default function UsarToggle(user) {
    const [toggleIsActive, setToggleIsActive] = useState(user.userStatus)

    useEffect(() => {
       
        
    }, [toggleIsActive, user.userCpf])

    const updateStatus = async () => {
        const response = await ApiUserStatus(user.userCpf, toggleIsActive)
        setToggleIsActive(response.statusUser)
    }

    const handleToggle = () => {
        setToggleIsActive(!toggleIsActive)
    }

    return (
        <Toggle
            checked={toggleIsActive}
            onChange={handleToggle}
        />
    )
}