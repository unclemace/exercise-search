import React from 'react'
import {fireEvent, screen, waitFor} from '@testing-library/react'
import { renderWithProviders } from '../utils/testUtils'
import { FilterContainer } from './filterContainer'
import { IFilter} from '../types/types';
import { AppStore, RootState, setupStore } from '../store/store';


const mockFilters: IFilter[] = [
    {
        name: 'body only',
        filterGroup: 'Equipment'
    },
    {
        name: 'shoulders',
        filterGroup: 'Muscle group'
    },
];

const initialState: RootState = {
    exercises: {
        exercises: [],
        chosenFilters: [],
        status: 'idle'
    }
}

let store: AppStore;

describe('filter container', () => {
    beforeEach(() => {
        store = setupStore(initialState);
        renderWithProviders(<FilterContainer  filters={mockFilters}/>, { store });
    })
    test('render filter groups and items',  async () => {
        const muscleGroupList = await screen.getByText('Muscle group');
        const equipmentList = await screen.getByText('Equipment');
        const muscleGroupItem = await screen.getByText('shoulders');
        const equipmentItem = await screen.getByText('body only');

        expect(muscleGroupList).toBeInTheDocument();
        expect(equipmentList).toBeInTheDocument();
        expect(muscleGroupItem).toBeInTheDocument();
        expect(equipmentItem).toBeInTheDocument();
    })

    test('clear all button appears after filter chosen and disappears after click on it', async () => {
        const clearAllButtonBefore = screen.queryByText('Clear all');
        expect(clearAllButtonBefore).not.toBeInTheDocument();

        const equipmentItem = screen.getByText('body only');

        fireEvent.click(equipmentItem);

        const clearAllButtonAfter = screen.getByText('Clear all');
        expect(clearAllButtonAfter).toBeInTheDocument();

        fireEvent.click(clearAllButtonAfter);

        expect(clearAllButtonAfter).not.toBeInTheDocument();
    })
})