import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { EquipmentType, MuscleGroupType } from "../../types/types";

interface FilterSlice {
    equipmentChosen: EquipmentType[];
    muscleGroupChosen: MuscleGroupType[];
}

const initialState: FilterSlice = {
    equipmentChosen: [],
    muscleGroupChosen: []
};

export const filterSlice = createSlice( {
    name: 'filter',
    initialState,
    reducers: {
        addEquipment: (state, action: PayloadAction<EquipmentType>) => {
            state.equipmentChosen.push(action.payload);
        },
        removeEquipment: (state, action: PayloadAction<number>) => {
            state.equipmentChosen = state.equipmentChosen.filter((item, index) => index !== action.payload);
        },
        addMuscleGroup: (state, action: PayloadAction<MuscleGroupType>) => {
            state.muscleGroupChosen.push(action.payload);
        },
        removeMuscleGroup: (state, action: PayloadAction<number>) => {
            state.muscleGroupChosen = state.muscleGroupChosen.filter((item, index) => index !== action.payload);
        },
    }
})


export const { addEquipment, removeEquipment, addMuscleGroup, removeMuscleGroup } = filterSlice.actions;
export const selectEquipment = (state: RootState) => state.filter.equipmentChosen;
export const selectMuscleGroup = (state: RootState) => state.filter.muscleGroupChosen;
export default filterSlice.reducer