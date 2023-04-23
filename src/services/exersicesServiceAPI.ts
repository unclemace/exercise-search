import axios from 'axios';
import { IFilter } from '../types/types';
import { exercisesMap } from "../utils/exercisesMap";


export const getFilteredExercises = async (chosenFilters: IFilter[]) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/filterExercises`, {
            params: {
                chosenFilters: chosenFilters
            }
        });
        return exercisesMap.toExercisesArray(data);
    } catch (er) {
        console.error(er);
    }
}

export const getFilteredExercisesV2 = async (chosenFilters: IFilter[]) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/filterExercisesV2`, {
            params: {
                chosenFilters: chosenFilters
            }
        });
        return exercisesMap.toRatedExercisesArray(data);
    } catch (er) {
        console.error(er);
    }
}