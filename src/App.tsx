import React from 'react';
import logo from './logo.svg';

import './scss/_main.scss';

//components
import ExerciseList from "./components/exercise-list";

//containers
import { FilterContainer } from './containers/filterContainer';


import {EquipmentType, IExercise, MuscleGroupType} from "./types/types";
import {ExercisesContainer} from "./containers/exercisesContainer";


function App() {
    const exercises: IExercise[] = [
        {
            name: 'Pull up',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'horizontal bar',
            muscleGroup: ['back', 'biceps', 'shoulders']
        },
        {
            name: 'Pull up',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'body only',
            muscleGroup: ['back', 'biceps', 'shoulders']
        },
        {
            name: 'Pull up',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'kettlebells',
            muscleGroup: ['back', 'biceps', 'shoulders']
        },
        {
            name: 'Pull up',
            description: 'Pull-ups are a functional bodyweight exercise that is great for building upper-body strength',
            imageSrc: 'https://static.strengthlevel.com/images/illustrations/pull-ups-1000x1000.jpg',
            requiredEquipment: 'bands',
            muscleGroup: ['back', 'biceps', 'shoulders']
        }
    ]
    const equipment: EquipmentType[] = ['body only', 'bands', 'kettlebells', 'horizontal bar'];
    const muscleGroups: MuscleGroupType[] = ['back', 'biceps', 'triceps', 'legs', 'chest','shoulders'];
    return (
        <div className="App">
          <section className='section section-desktop'>
              <FilterContainer muscleGroups={muscleGroups} equipment={equipment}/>
              <ExercisesContainer exercises={exercises}/>
          </section>
        </div>
    );
}

export default App;
