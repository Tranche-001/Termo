import React, { useEffect, useRef, useState } from 'react'

interface ModalProps {
  isInvalidWordModalOpen: boolean;
}

const InvalidWordModal: React.FC<ModalProps> = ({ isInvalidWordModalOpen }) => {

  return (
    <div className = {isInvalidWordModalOpen ? 'modal fade-in' : 'modal fade-out'}>
      <div>
        <div>essa palavra não é aceita</div>
      </div>
    </div>
  )
}

export default InvalidWordModal;