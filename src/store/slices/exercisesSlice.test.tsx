import reducer, {
    addFilter,
    removeFilter,
    clearFilters,
    ExercisesSlice,
    selectExercises,
    selectChosenFilters,
    fetchExercises
} from './exercisesSlice';
import { IFilter } from '../../types/types';
import { RootState } from '../store';
import { jest } from "@jest/globals";
import * as exercisesService from "../../services/exercisesService";
import {configureStore} from "@reduxjs/toolkit";



describe('Filter slice', () => {

    test('Should return initial state', () => {
        expect(reducer(undefined, {type: undefined})).toEqual({
            exercises: [],
            chosenFilters: [],
            status: 'idle'
        })
    })

    test('Should handle filter added to a empty list', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [],
            status: 'idle'
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
            status: 'idle'
        })
    })
    test('Should handle filter added to an existing list', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [{
                filterGroup: 'Muscle group',
                name: 'legs'
            }],
            status: 'idle'
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
            status: 'idle'
        })
    })

    test('Should handle filter removed from empty list', () => {
        const previousState: ExercisesSlice = {
            exercises: [],
            chosenFilters: [],
            status: 'idle'
        }

        const filter: IFilter = {
            filterGroup: 'Muscle group',
            name: 'legs'
        }
        expect(reducer(previousState, removeFilter(filter))).toEqual({
            exercises: [],
            chosenFilters: [],
            status: 'idle'
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
            status: 'idle'
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
            status: 'idle'
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
            status: 'idle'
        }

        expect(reducer(previousState, clearFilters())).toEqual({
            exercises: [],
            chosenFilters: [],
            status: 'idle'
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
                        visible: true,
                    },
                    {
                        name: 'Bench press',
                        description: 'frequently used. [3]',
                        imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                        requiredEquipment: 'kettlebells',
                        muscleGroup: ['legs', 'chest' ],
                        visible: true,
                    },
                ],
                chosenFilters: [],
                status: 'idle'
            }
        }

        expect(selectExercises(preloadedState)).toEqual([
            {
                name: 'Push up',
                description: 'T deltoids, serratus anterior',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
                visible: true,
            },
            {
                name: 'Bench press',
                description: 'frequently used. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
                visible: true,
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
                status: 'idle'
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

    test('Fetch exercises fulfills with exercises data', async () => {
        jest.spyOn(exercisesService, 'getExercises' ).mockResolvedValue(Promise.resolve([
            {
                name: 'Pull up',
                description: 'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands, gripping a bar or other implement at a distance typically wider than shoulder-width, and pulled up. As this happens, the elbows flex and the shoulders adduct and extend to bring the elbows to the torso. Pull-ups build up several muscles of the upper body, including the latissimus dorsi, trapezius, and biceps brachii. A pull-up may be performed with overhand (pronated), underhand (supinated)—sometimes referred to as a chin-up—neutral, or rotating hand position. Pull-ups are used by some organizations as a component of fitness tests, and as a conditioning activity for some sports.',
                imageSrc: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up-variations.jpg',
                requiredEquipment: 'horizontal bar',
                muscleGroup: ['back', 'biceps'],
                visible: true,
            },
            {
                name: 'Push up',
                description: 'The push-up (sometimes called a press-up in British English) is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole.[1] Push-ups are a basic exercise used in civilian athletic training or physical education and commonly in military physical training. They are also a common form of punishment used in the military, school sport, and some martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
                visible: true,
            },
        ]));

        const store = configureStore({
            reducer: reducer
        })

        await store.dispatch(fetchExercises());
        expect(store.getState().exercises).toEqual([
            {
                name: 'Pull up',
                description: 'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands, gripping a bar or other implement at a distance typically wider than shoulder-width, and pulled up. As this happens, the elbows flex and the shoulders adduct and extend to bring the elbows to the torso. Pull-ups build up several muscles of the upper body, including the latissimus dorsi, trapezius, and biceps brachii. A pull-up may be performed with overhand (pronated), underhand (supinated)—sometimes referred to as a chin-up—neutral, or rotating hand position. Pull-ups are used by some organizations as a component of fitness tests, and as a conditioning activity for some sports.',
                imageSrc: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up-variations.jpg',
                requiredEquipment: 'horizontal bar',
                muscleGroup: ['back', 'biceps'],
                visible: true,
            },
            {
                name: 'Push up',
                description: 'The push-up (sometimes called a press-up in British English) is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole.[1] Push-ups are a basic exercise used in civilian athletic training or physical education and commonly in military physical training. They are also a common form of punishment used in the military, school sport, and some martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
                visible: true,
            },
        ])
    })
})