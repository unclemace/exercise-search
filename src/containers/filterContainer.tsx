import React, {FC, useState} from "react";
import { useAppDispatch,  useAppSelector } from "../hooks/hooks";
import { FilterList } from "../components/filterList";
import {EquipmentType, MuscleGroupType, isEquipment, isMuscleGroup} from "../types/types";
import { addEquipment, removeEquipment, addMuscleGroup, removeMuscleGroup, selectEquipment, selectMuscleGroup } from "../store/slices/filterSlice";

interface FilterContainerProps {
    equipment: EquipmentType[],
    muscleGroups: MuscleGroupType[]
}

export const FilterContainer: FC<FilterContainerProps> = ({equipment, muscleGroups}) => {
    const dispatch = useAppDispatch();
    const equipmentState = useAppSelector(selectEquipment);
    const muscleGroupState = useAppSelector(selectMuscleGroup);
    const [searchInput, setSearchInput] = useState('');

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

    return (
         <section className='filter'>
            <header>
              <h2>Equipment selection</h2>
            </header>
            <div className='filter__container'>
              <FilterList onFilterClick={handleFilterClick} filterList={equipment}/>
              <FilterList onFilterClick={handleFilterClick} filterList={muscleGroups}/>
            </div>
         </section>
    )
};
