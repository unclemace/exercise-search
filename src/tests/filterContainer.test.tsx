import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../utils/testUtils'
import { FilterContainer } from '../containers/filterContainer'
import { IFilter } from "../types/types";

import { setupStore } from "../store/store";



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

test('render filter groups and items',  async () => {
    renderWithProviders(<FilterContainer  filters={mockFilters}/>)
    const muscleGroupList = await screen.getByText('Muscle group');
    const equipmentList = await screen.getByText('Equipment');
    const muscleGroupItem = await screen.getByText('shoulders');
    const equipmentItem = await screen.getByText('body only');

    expect(muscleGroupList).toBeInTheDocument();
    expect(equipmentList).toBeInTheDocument();

    expect(muscleGroupItem).toBeInTheDocument();
    expect(equipmentItem).toBeInTheDocument();
})

test('dispatches filter after click',  () => {
    const store = setupStore();
    renderWithProviders(<FilterContainer  filters={mockFilters}/>, {store})
    const equipmentItem = screen.getByText('body only');

    fireEvent.click(equipmentItem);

    const state = store.getState();
    expect(state.exercises.chosenFilters).toEqual([
        {
            name: 'body only',
            filterGroup: 'Equipment'
        }
    ])
})