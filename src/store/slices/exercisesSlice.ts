import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {RootState} from '../store';
import {IExercise, IFilter} from "../../types/types";

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
        addFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters.push(action.payload);
        },
        removeFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters = state.chosenFilters.filter(filter => {
                if (filter.filterGroup === action.payload.filterGroup) {
                    return filter.name !== action.payload.name
                }
                else {
                    return true;
                }
            })
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