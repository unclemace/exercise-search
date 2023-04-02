export interface IExercise {
    name: string;
    description: string;
    imageSrc: string;
    requiredEquipment: string;
    muscleGroup: string[];
}

export interface IFilter {
    values: string[];
    filterGroup: FilterGroup;
}

export type FilterValue = {
    value: string;
    filterGroup: FilterGroup;
}

export type FilterGroup = 'Equipment' | 'Muscle group';

