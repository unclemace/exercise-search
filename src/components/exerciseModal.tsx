import React, {FC} from 'react';

import {IExercise} from '../types/types';
import Modal from "react-modal";

interface ExerciseModalProps {
    exercise: IExercise;
    isOpen: boolean;
    closeModal: () => void
}


const ExerciseModal: FC<ExerciseModalProps> = ({exercise, isOpen, closeModal}) => {
    const {name, imageSrc, requiredEquipment, muscleGroup, description} = exercise;
    return (
        <Modal ariaHideApp={false} className="exercise-modal" isOpen={isOpen}>
            <i onClick={closeModal} className='gg-close'></i>
            <div className="exercise-modal__description">
                <h3>{name}</h3>
                <p>Required Equipment: {requiredEquipment}</p>
                <p>Trained muscles: {muscleGroup.join(', ')}</p>
                <p>{description}</p>
            </div>
        </Modal>
    )
}

export default ExerciseModal;