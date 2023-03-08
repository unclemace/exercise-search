import React, {FC} from 'react';

import {IExercise} from '../types/types';

interface ExerciseProps {
    exercise: IExercise;
}


const ExerciseCard: FC<ExerciseProps> = ({exercise}) => {
    const {name, imageSrc, requiredEquipment, muscleGroup} = exercise;
    return (
        <li className='exercises__item'>
            <img src={imageSrc} alt="Exercise image"/>
            <div className="exercises__description">
                <h3>{name}</h3>
                <p>Required Equipment: {requiredEquipment}</p>
                <p>Trained muscles: {muscleGroup.join(', ')}</p>
            </div>
        </li>
    )
}

export default ExerciseCard;