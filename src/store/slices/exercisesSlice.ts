import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { FilterValue, IExercise, IFilter } from '../../types/types';
export interface ExercisesSlice {
    exercises: IExercise[];
    chosenFilters: IFilter[];
}

const initialState: ExercisesSlice = {
    exercises: [],
    chosenFilters: [],
};

export const exercisesSlice = createSlice( {
    name: 'exercises',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<FilterValue>) => {
            const { filterGroup, value } = action.payload;
            const groupPos = state.chosenFilters.findIndex(chosenFilter => chosenFilter.filterGroup === filterGroup);
            if (groupPos > -1) {
                state.chosenFilters[groupPos].values.push(value)
            }
            else {
                state.chosenFilters.push({
                    filterGroup: filterGroup,
                    values: [value]
                })
            }
        },
        removeFilter: (state, action: PayloadAction<FilterValue>) => {
            const { filterGroup, value } = action.payload;
            const groupIndex = state.chosenFilters.findIndex(chosenFilter => chosenFilter.filterGroup === filterGroup);
            const pos = state.chosenFilters[groupIndex]?.values.indexOf(value);
            if (pos > -1) {
                state.chosenFilters[groupIndex].values.splice(pos, 1)
            }
        },
        clearFilters: (state) => {
            state.chosenFilters = [];
        },
        setExercises: (state, action: PayloadAction<IExercise[]>) => {
            state.exercises = action.payload;
        }
    }
})
export const { addFilter, removeFilter, clearFilters, setExercises } = exercisesSlice.actions;
export const selectExercises = (state: RootState) => {
    return state.exercises.exercises;
}
export const selectChosenFilters = (state: RootState) => {
    return state.exercises.chosenFilters;
}
export default exercisesSlice.reducer