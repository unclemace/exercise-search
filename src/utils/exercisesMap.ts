import { IExercise } from "../types/types";

export const exercisesMapV2 = {
    toExerciseV2: <Type
        extends {
        name: string,
        description: string,
        image_src: string,
        required_equipment: string,
        muscle_group: {
            name: string,
            value: string
        }[] }>
    (raw: Type): IExercise => {
        const { name, description, image_src, required_equipment, muscle_group } = raw;
        return {
            name: name,
            description: description,
            imageSrc: image_src,
            requiredEquipment: required_equipment,
            muscleGroup: muscle_group.map((group) => group.value),
        }
    },
    toExercisesV2Array: (arr: any[]): IExercise[] => {
        return arr.map(element => exercisesMapV2.toExerciseV2(element))
    }
}