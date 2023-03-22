import reducer, {
    addFilter,
    removeFilter,
    clearFilters,
    setExercises,
    ExercisesSlice,
    selectExercises,
    selectChosenFilters,
} from './exercisesSlice';
import {IExercise, IFilter} from '../../types/types';
import { RootState } from '../store';



describe('Filter slice', () => {

    test('Should return initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual({
            exercises: [],
            chosenFilters: [],
        })
    })

    test('Should handle filter added to a empty list', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [],
        }
        const filter: IFilter = {
            filterGroup: 'Muscle group',
            name: 'legs'
        }
        expect(reducer(previousState, addFilter(filter))).toEqual({
            exercises: [],
            chosenFilters: [{
                filterGroup: 'Muscle group',
                name: 'legs'
            }],
        })
    })
    test('Should handle filter added to an existing list', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [{
                filterGroup: 'Muscle group',
                name: 'legs'
            }],
        }

        const filter: IFilter = {
            filterGroup: 'Equipment',
            name: 'body only'
        }

        expect(reducer(previousState, addFilter(filter))).toEqual({
            exercises: [],
            chosenFilters: [
                {
                    filterGroup: 'Muscle group',
                    name: 'legs'
                },
                {
                    filterGroup: 'Equipment',
                    name: 'body only'
                }
            ],
        })
    })

    test('Should handle filter removed from empty list', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [],
        }

        const filter: IFilter = {
            filterGroup: 'Muscle group',
            name: 'legs'
        }
        expect(reducer(previousState, removeFilter(filter))).toEqual({
            exercises: [],
            chosenFilters: [],
        })
    })
    test('Should handle filter removed from existed list', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [
                {
                    filterGroup: 'Muscle group',
                    name: 'legs'
                },
                {
                    filterGroup: 'Equipment',
                    name: 'body only'
                }
            ],
        }

        const filter: IFilter = {
                filterGroup: 'Muscle group',
                name: 'legs'
        }
        expect(reducer(previousState, removeFilter(filter))).toEqual({
            exercises: [],
            chosenFilters: [
                {
                    filterGroup: 'Equipment',
                    name: 'body only'
                }
            ],
        })
    })

    test('Should clear all chosen filters', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [
                {
                    filterGroup: 'Muscle group',
                    name: 'legs'
                },
                {
                    filterGroup: 'Equipment',
                    name: 'body only'
                }
            ],
        }

        expect(reducer(previousState, clearFilters())).toEqual({
            exercises: [],
            chosenFilters: [],
        })
    })

    test('Should set exercises', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [
                {
                    filterGroup: 'Muscle group',
                    name: 'legs'
                },
                {
                    filterGroup: 'Equipment',
                    name: 'body only'
                }
            ],
        }
        const exercises: IExercise[] = [
            {
                name: 'Push up',
                description: 'T deltoids, serratus anterior',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
            },
            {
                name: 'Bench press',
                description: 'frequently used. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
            },
        ]
        expect(reducer(previousState, setExercises(exercises))).toEqual({
            exercises: [
                {
                    name: 'Push up',
                    description: 'T deltoids, serratus anterior',
                    imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                    requiredEquipment: 'body only',
                    muscleGroup: ['shoulders'],
                },
                {
                    name: 'Bench press',
                    description: 'frequently used. [3]',
                    imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                    requiredEquipment: 'kettlebells',
                    muscleGroup: ['legs', 'chest' ],
                },
            ],
            chosenFilters: [
                {
                    filterGroup: 'Muscle group',
                    name: 'legs'
                },
                {
                    filterGroup: 'Equipment',
                    name: 'body only'
                }
            ],
        })
    })

    test('Should return array of current exercises', () => {
        const preloadedState: RootState = {
            exercises: {
                exercises: [
                    {
                        name: 'Push up',
                        description: 'T deltoids, serratus anterior',
                        imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                        requiredEquipment: 'body only',
                        muscleGroup: ['shoulders'],
                    },
                    {
                        name: 'Bench press',
                        description: 'frequently used. [3]',
                        imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                        requiredEquipment: 'kettlebells',
                        muscleGroup: ['legs', 'chest' ],
                    },
                ],
                chosenFilters: [],
            }
        }

        expect(selectExercises(preloadedState)).toEqual([
            {
                name: 'Push up',
                description: 'T deltoids, serratus anterior',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
            },
            {
                name: 'Bench press',
                description: 'frequently used. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
            },
        ])
    })

    test('Should return array of current chosen filters', () => {
        const preloadedState: RootState = {
            exercises: {
                exercises: [],
                chosenFilters: [
                    {
                        filterGroup: 'Muscle group',
                        name: 'legs'
                    },
                    {
                        filterGroup: 'Equipment',
                        name: 'body only'
                    }
                ],
            }
        }

        expect(selectChosenFilters(preloadedState)).toEqual(
            [
                {
                    filterGroup: 'Muscle group',
                    name: 'legs'
                },
                {
                    filterGroup: 'Equipment',
                    name: 'body only'
                }
            ],
        )
    })

})