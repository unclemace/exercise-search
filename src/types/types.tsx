export interface IExercise {
    name: string;
    description: string;
    imageSrc: string;
    requiredEquipment: EquipmentType;
    muscleGroup: MuscleGroupType[];
}



export type MuscleGroupType = 'back' | 'biceps' | 'triceps' | 'legs' | 'chest' | 'shoulders';

export type EquipmentType = 'body only' | 'bands' | 'kettlebells' | 'horizontal bar';
