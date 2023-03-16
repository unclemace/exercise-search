import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import exercisesReducer from './slices/exercisesSlice';

const rootReducer = combineReducers({
    exercises: exercisesReducer
})

export function setupStore(preloadedState?: PreloadedState<RootState>){
    return configureStore({
        reducer:rootReducer,
        preloadedState
    })
}


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']