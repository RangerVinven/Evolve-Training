import React from 'react'

import Logo from '../components/Logo'
import Title from '../components/Title'

export default function signedin() {
  return (
    <div>
        <div className="absolute">
            <Logo />
        </div>
        <Title title="All Staff" showDate={true} showBackButton={true} previousPage="/staff" />
        
    </div>
  )
}
