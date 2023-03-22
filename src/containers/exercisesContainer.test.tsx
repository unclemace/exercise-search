import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import { jest } from '@jest/globals';
import { renderWithProviders } from '../utils/testUtils'
import { ExercisesContainer } from './exercisesContainer'
import * as exercisesService from '../services/exercisesService';
import {IExercise} from "../types/types";


describe('exercises container', () => {
    beforeEach( () => {
        jest.spyOn(exercisesService, 'filterExercises' ).mockResolvedValue([
            {
                name: 'Pull up',
                description: 'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands, gripping a bar or other implement at a distance typically wider than shoulder-width, and pulled up. As this happens, the elbows flex and the shoulders adduct and extend to bring the elbows to the torso. Pull-ups build up several muscles of the upper body, including the latissimus dorsi, trapezius, and biceps brachii. A pull-up may be performed with overhand (pronated), underhand (supinated)—sometimes referred to as a chin-up—neutral, or rotating hand position. Pull-ups are used by some organizations as a component of fitness tests, and as a conditioning activity for some sports.',
                imageSrc: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up-variations.jpg',
                requiredEquipment: 'horizontal bar',
                muscleGroup: ['back', 'biceps'],
            },
            {
                name: 'Push up',
                description: 'The push-up (sometimes called a press-up in British English) is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole.[1] Push-ups are a basic exercise used in civilian athletic training or physical education and commonly in military physical training. They are also a common form of punishment used in the military, school sport, and some martial arts disciplines.',
                imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
                requiredEquipment: 'body only',
                muscleGroup: ['shoulders'],
            },
        ]);
    })

    test('renders exercises list',   async () => {
        await act(async () => {
            renderWithProviders(<ExercisesContainer/>);
        })

        const exercise1 = await screen.findByText('Pull up');
        const exercise2 = await screen.findByText('Push up');

        expect(exercise1).toBeInTheDocument();
        expect(exercise2).toBeInTheDocument();
    })

    test('search through exercises', async () => {
        await act(async () => {
            renderWithProviders(<ExercisesContainer/>);
        })
        const searchBar =  screen.getByLabelText('searchbar-input');
        const exerciseUnsuitable = await screen.findByText('Push up');
        const exerciseSuitable = await screen.findByText('Pull up');

        expect(exerciseUnsuitable).toBeInTheDocument();
        expect(exerciseSuitable).toBeInTheDocument()

        fireEvent.change(searchBar, {target: {value: 'Pul'}});

        expect(exerciseUnsuitable).not.toBeInTheDocument();
        expect(exerciseSuitable).toBeInTheDocument();
    })
})