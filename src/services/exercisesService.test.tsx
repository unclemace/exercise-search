import { getExercises, filterExercises } from "./exercisesService";
import {IExercise, IFilter} from "../types/types";


describe('exercises service', () => {
    test('returns list of exercises', async () => {
        const exercises = await getExercises();
        expect(exercises).toBeInstanceOf(Array);
    })
    test('filters array of exercises', () => {
        const exercisesMock: IExercise[] = [
            {
                name: 'Push up',
                description: 'martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
                visible: true,
            },
            {
                name: 'Bench press',
                description: '. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
                visible: true,
            },
            {
                name: 'Dead lift',
                description: 'ngman deadlifting contests.',
                imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
                requiredEquipment: 'bands',
                muscleGroup: ['legs', 'triceps'],
                visible: true,
            }
        ]
        const chosenFilters: IFilter[] = [
            {
                filterGroup: "Muscle group",
                name: 'legs'
            }
        ]

        const filteredExercises = filterExercises(exercisesMock, chosenFilters);

        expect(filteredExercises[0].visible).toEqual(false);
        expect(filteredExercises[1].visible).toEqual(true);
        expect(filteredExercises[2].visible).toEqual(true);
    })

    test('filters empty array of exercises', () => {
        const exercisesMock: IExercise[] = [];
        const chosenFilters: IFilter[] = [
            {
                filterGroup: "Muscle group",
                name: 'legs'
            }
        ]

        expect(filterExercises(exercisesMock, chosenFilters)).toEqual([]);
    })

    test('filters exercises with no chosen filters', () => {
        const exercisesMock: IExercise[] = [
            {
                name: 'Push up',
                description: 'martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
                visible: true,
            },
            {
                name: 'Bench press',
                description: '. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
                visible: true,
            },
            {
                name: 'Dead lift',
                description: 'ngman deadlifting contests.',
                imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
                requiredEquipment: 'bands',
                muscleGroup: ['legs', 'triceps'],
                visible: true,
            }
        ]
        const chosenFilters: IFilter[] = [];

        expect(filterExercises(exercisesMock, chosenFilters)).toEqual(exercisesMock);
    })
    test('filters exercises with no matched chosen filters', () => {
        const exercisesMock: IExercise[] = [
            {
                name: 'Push up',
                description: 'martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
                visible: true,
            },
            {
                name: 'Bench press',
                description: '. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
                visible: true,
            },
            {
                name: 'Dead lift',
                description: 'ngman deadlifting contests.',
                imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
                requiredEquipment: 'bands',
                muscleGroup: ['legs', 'triceps'],
                visible: true,
            }
        ]
        const chosenFilters: IFilter[] = [
            {
                filterGroup: "Equipment",
                name: 'horizontal bar'
            }
        ];

        const filteredExercises = filterExercises(exercisesMock, chosenFilters);

        expect(filteredExercises.find(exercise => exercise.visible)).toEqual(undefined);
    })
})