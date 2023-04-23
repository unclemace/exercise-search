import * as exercisesModule from "./exercisesService";
import {IExercise, IFilter} from "../types/types";


describe('exercises service', () => {
    const { getExercises, filterExercises } = exercisesModule;

    test('returns list of exercises', async () => {
        const exercises = await getExercises();
        expect(exercises).toBeInstanceOf(Array);
    })
    test('filters array of exercises', async () => {
        const exercisesMock: IExercise[] = [
            {
                name: 'Push up',
                description: 'martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
            },
            {
                name: 'Bench press',
                description: '. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
            },
            {
                name: 'Dead lift',
                description: 'ngman deadlifting contests.',
                imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
                requiredEquipment: 'bands',
                muscleGroup: ['legs', 'triceps'],
            }
        ]
        jest.spyOn(exercisesModule, 'getExercises').mockResolvedValue(exercisesMock);

        const chosenFilters: IFilter[] = [
            {
                filterGroup: "Muscle group",
                values: ['legs']
            }
        ]

        const filteredExercises = await filterExercises(chosenFilters, { rated: false });
        expect(filteredExercises).toEqual([
            {
                name: 'Bench press',
                description: '. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
            },
            {
                name: 'Dead lift',
                description: 'ngman deadlifting contests.',
                imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
                requiredEquipment: 'bands',
                muscleGroup: ['legs', 'triceps'],
            }
        ]);
    })

    test('filters empty array of exercises', async () => {
        const exercisesMock: IExercise[] = [];
        jest.spyOn(exercisesModule, 'getExercises').mockResolvedValue(exercisesMock);
        const chosenFilters: IFilter[] = [
            {
                filterGroup: "Muscle group",
                values: ['legs']
            }
        ]
        const filteredExercises = await filterExercises(chosenFilters, {rated: false});
        expect(filteredExercises).toEqual([]);
    })

    test('filters exercises with no chosen filters', async () => {
        const exercisesMock: IExercise[] = [
            {
                name: 'Push up',
                description: 'martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
            },
            {
                name: 'Bench press',
                description: '. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
            },
            {
                name: 'Dead lift',
                description: 'ngman deadlifting contests.',
                imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
                requiredEquipment: 'bands',
                muscleGroup: ['legs', 'triceps'],
            }
        ]
        jest.spyOn(exercisesModule, 'getExercises').mockResolvedValue(exercisesMock);
        const chosenFilters: IFilter[] = [];
        const filteredExercises = await filterExercises(chosenFilters, { rated:false });
        expect(filteredExercises).toEqual(exercisesMock);
    })
    test('filters exercises with no matched chosen filters', async () => {
        const exercisesMock: IExercise[] = [
            {
                name: 'Push up',
                description: 'martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
            },
            {
                name: 'Bench press',
                description: '. [3]',
                imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
                requiredEquipment: 'kettlebells',
                muscleGroup: ['legs', 'chest' ],
            },
            {
                name: 'Dead lift',
                description: 'ngman deadlifting contests.',
                imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
                requiredEquipment: 'bands',
                muscleGroup: ['legs', 'triceps'],
            }
        ]
        jest.spyOn(exercisesModule, 'getExercises').mockResolvedValue(exercisesMock);

        const chosenFilters: IFilter[] = [
            {
                filterGroup: "Equipment",
                values: ['horizontal bar']
            }
        ];

        const filteredExercises = await filterExercises(chosenFilters, { rated: false });

        expect(filteredExercises).toEqual([]);
    })
})