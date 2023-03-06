export interface IExercise {
    name: string;
    description: string;
    imageSrc: string;
    requiredEquipment: string;
    muscleGroup: string[];
    visible: boolean;
}

export interface IFilter {
    name: string;
    filterGroup: FilterGroup;
}

export type FilterGroup = 'Equipment' | 'Muscle group';

export type MuscleGroupType = 'back' | 'biceps' | 'triceps' | 'legs' | 'chest' | 'shoulders';

export type EquipmentType = 'body only' | 'bands' | 'kettlebells' | 'horizontal bar';

export const isEquipment = (filter: string): filter is EquipmentType => {
    const equipmentList = ['body only', 'bands', 'kettlebells', 'horizontal bar'];
    return equipmentList.indexOf(filter) !== -1;
}
export const isMuscleGroup = (filter: string): filter is MuscleGroupType => {
    const muscleGroupList = ['back', 'biceps', 'triceps', 'legs', 'chest','shoulders'];
    return muscleGroupList.indexOf(filter) !== -1;
}
