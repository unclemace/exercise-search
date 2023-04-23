import {IExercise, IRatedExercise} from "../types/types";

export const exercisesMap = {
    toExercise: (raw: any): IExercise => {
        const { name, description, imageSrc, requiredEquipment, muscleGroup } = raw;
        return {
            name: name? name: '',
            description: description? description: '',
            imageSrc: imageSrc? imageSrc: '',
            requiredEquipment: requiredEquipment? requiredEquipment: '',
            muscleGroup: muscleGroup? muscleGroup: [],
        }
    },
    toExercisesArray: (arr: any[]): IExercise[] => {
        return arr.map(element => exercisesMap.toExercise(element))
    },
    toRatedExercise: (raw: any): IRatedExercise => {
        const exercise = exercisesMap.toExercise(raw);
        return {
            ...exercise,
            rating: raw.rating? raw.rating: 0
        }
    },
    toRatedExercisesArray: (arr: any[]): IExercise[] => {
        return arr.map(element => exercisesMap.toRatedExercise(element))
    },
}