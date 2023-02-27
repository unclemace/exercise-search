import React, {FC, useEffect} from "react";
import { useAppDispatch,  useAppSelector } from "../hooks/hooks";
import { FilterList } from "../components/equipment-list";
import {EquipmentType, MuscleGroupType} from "../types/types";
import { addEquipment, removeEquipment, addMuscleGroup, removeMuscleGroup, selectEquipment, selectMuscleGroup } from "../store/slices/filterSlice";

interface FilterContainerProps {
    equipment: EquipmentType[],
    muscleGroups: MuscleGroupType[]
}

export const FilterContainer: FC<FilterContainerProps> = ({equipment, muscleGroups}) => {
    const dispatch = useAppDispatch();
    const equipmentState = useAppSelector(selectEquipment);
    const muscleGroupState = useAppSelector(selectMuscleGroup);

    const handleFilterClick = (filterChosen: EquipmentType | MuscleGroupType) => {
        if (isEquipment(filterChosen)) {
            if (equipmentState.includes(filterChosen)) {
                const index = equipment.indexOf(filterChosen);
                dispatch(removeEquipment(index));
            }
            else {
                dispatch(addEquipment(filterChosen));
            }
        }
        else if (isMuscleGroup(filterChosen)) {
            if (muscleGroupState.includes(filterChosen)) {
                const index = muscleGroupState.indexOf(filterChosen);
                dispatch(removeMuscleGroup(index));
            }
            else {
                dispatch(addMuscleGroup(filterChosen));
            }
        }
    }

    const isEquipment = (filter: string): filter is EquipmentType => {
        const equipmentList = ['body only', 'bands', 'kettlebells', 'horizontal bar'];
        return equipmentList.indexOf(filter) !== -1;
    }
    const isMuscleGroup = (filter: string): filter is MuscleGroupType => {
        const muscleGroupList = ['back', 'biceps', 'triceps', 'legs', 'chest','shoulders'];
        return muscleGroupList.indexOf(filter) !== -1;
    }

    return (
         <div className='filter'>
            <header>
              <h2>Equipment selection</h2>
              <div className='searchbar-container'>
                <input type='text'  placeholder='Find equipment' className='equipment__search-bar'/>
                <i></i>
              </div>
            </header>
            <div className='filter__container'>
              <FilterList onFilterClick={handleFilterClick} filterList={equipment}/>
              <FilterList onFilterClick={handleFilterClick} filterList={muscleGroups}/>
            </div>
         </div>
    )
};
