import React from "react";

interface InvalidWordModalProps {
  isInvalidWordModalOpen: boolean;
}

const InvalidWordModal: React.FC<InvalidWordModalProps> = ({ isInvalidWordModalOpen }) => {
  return (
    <div className={isInvalidWordModalOpen ? "modal fade-in" : "modal fade-out"}>
      <div>
        <div>essa palavra não é aceita</div>
      </div>
    </div>
  );
};

export default InvalidWordModal;
