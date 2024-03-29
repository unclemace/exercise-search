import axios from 'axios';
import { IFilter } from '../types/types';


export const getFilteredExercises = async (chosenFilters: IFilter[]) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/filterExercises`, {
            params: {
                chosenFilters: chosenFilters
            }
        });
        return data;
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
        return data;
    } catch (er) {
        console.error(er);
    }
}