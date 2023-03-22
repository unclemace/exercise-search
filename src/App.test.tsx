import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './utils/testUtils';
import { setupStore } from './store/store';
import { jest } from '@jest/globals';
import * as exercisesService from './services/exercisesService';


describe('Exercise search', () => {
    beforeEach(() => {
        jest.spyOn(exercisesService, 'getExercises' ).mockResolvedValue([
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
    test('Should apply chosen filters to exercises block', async () => {
        const store = setupStore();
        await renderWithProviders(<App/>, {store})
        const filter = screen.getByText('body only');
        const suitableExerciseBefore =  await screen.findByText('Push up');
        const unsuitableExerciseBefore = await screen.findByText('Pull up');

        expect(suitableExerciseBefore).toBeInTheDocument();
        expect(unsuitableExerciseBefore).toBeInTheDocument();

        fireEvent.click(filter);

        await waitFor(() => expect(screen.queryByText('Push up')).toBeInTheDocument())
        await waitFor(() => expect(screen.queryByText('Pull up')).not.toBeInTheDocument())

        const clearAllButton = screen.getByText('Clear all');
        fireEvent.click(clearAllButton);

        await waitFor(() => expect(screen.queryByText('Pull up')).toBeInTheDocument())
        await waitFor(() => expect(screen.queryByText('Push up')).toBeInTheDocument())
    });
});
