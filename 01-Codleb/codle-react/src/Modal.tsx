import React, { useEffect, useRef, useState } from 'react'

interface ModalProps {
  isModalOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen }) => {

  return (
    <div className='modal'>
      <div>
        <div>essa palavra não é aceita</div>
      </div>
    </div>
  )
}

export default Modal