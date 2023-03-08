import React, {FC, useEffect, useState} from 'react';

import {IExercise} from '../types/types';
import  ExerciseModal from './exerciseModal'

interface ExerciseProps {
    exercise: IExercise;
}


const ExerciseCard: FC<ExerciseProps> = ({exercise}) => {
    const {name, imageSrc, requiredEquipment, muscleGroup, description} = exercise;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openModal = () => {
        setModalIsOpen(true)
    }

    return (
        <li className='exercises__item'>
            <a onClick={openModal} >
                <img src={imageSrc} alt="Exercise image"/>
                <div className="exercises__description">
                    <h3>{name}</h3>
                    <p>Required Equipment: {requiredEquipment}</p>
                    <p>Trained muscles: {muscleGroup.join(', ')}</p>
                </div>
            </a>
            <ExerciseModal exercise={exercise} isOpen={modalIsOpen} closeModal={closeModal}/>
        </li>
    )
}

export default ExerciseCard;