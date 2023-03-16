import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { IExercise, IFilter } from "../../types/types";
import { getExercises, filterExercises } from "../../services/exercisesService";


export const fetchExercises = createAsyncThunk('exercises/fetchExercises', async () => {
    return await getExercises();
})

export interface ExercisesSlice {
    exercises: IExercise[];
    chosenFilters: IFilter[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ExercisesSlice = {
    exercises: [],
    chosenFilters: [],
    status: 'idle'
};

export const exercisesSlice = createSlice( {
    name: 'exercises',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters.push(action.payload);
            filterExercises(state.exercises, state.chosenFilters);
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
            filterExercises(state.exercises, state.chosenFilters);
        },
        clearFilters: (state) => {
            state.chosenFilters = [];
            filterExercises(state.exercises, state.chosenFilters);
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchExercises.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchExercises.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.exercises = action.payload as IExercise[];
            })
            .addCase(fetchExercises.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})
export const { addFilter, removeFilter, clearFilters } = exercisesSlice.actions;
export const selectExercises = (state: RootState) => {
    return state.exercises.exercises;
}
export const selectChosenFilters = (state: RootState) => {
    return state.exercises.chosenFilters;
}
export default exercisesSlice.reducer