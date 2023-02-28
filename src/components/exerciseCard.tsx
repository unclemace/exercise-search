import React, {FC} from 'react';

import {IExercise} from '../types/types';

interface ExerciseProps {
    exercise: IExercise;
}


const ExerciseCard: FC<ExerciseProps> = ({exercise}) => {
    const {name, description, imageSrc, requiredEquipment, muscleGroup} = exercise;
    return (
        <li className='exercises__item'>
            <a>
                <img src={imageSrc} alt="Exercise image"/>
                <h3>{name}</h3>
                <p>{description}</p>
                <p>Required Equipment: {requiredEquipment}</p>
                <p>Trained muscles: {muscleGroup.join(', ')}</p>
            </a>
        </li>
    )
}

export default ExerciseCard;