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

