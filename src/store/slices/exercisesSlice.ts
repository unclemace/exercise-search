import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../store";
import {IExercise, IFilter} from "../../types/types";

const isFitsByMuscleGroup = (exercise: IExercise, chosenMuscleGroups: IFilter[]) => {
    if (chosenMuscleGroups.length === 0 ) {
        return true
    }
    else {
        const muscleGroupArray: string[] = [];
        chosenMuscleGroups.forEach(chosenMuscleGroup => muscleGroupArray.push(chosenMuscleGroup.name));
        return muscleGroupArray.some(group => exercise.muscleGroup.includes(group));
    }
}
const isFitsByEquipment = (exercise: IExercise, chosenEquipment: IFilter[]) => {
    if (chosenEquipment.length === 0) {
        return true;
    }
    else {
        const equipmentArray: string[] = [];
        chosenEquipment.forEach(equipment => equipmentArray.push(equipment.name));
        return equipmentArray.includes(exercise.requiredEquipment);

    }
}
const filterExercises = (exercises: IExercise[], chosenFilters: IFilter[]) => {
    const muscleGroupFilters = chosenFilters.filter(filter => filter.filterGroup === 'Muscle group');
    const equipmentFilters = chosenFilters.filter(filter => filter.filterGroup === 'Equipment');
    return exercises.filter(exercise => {
        exercise.visible = isFitsByEquipment(exercise, equipmentFilters) && isFitsByMuscleGroup(exercise, muscleGroupFilters);
        return true;
    });
}
interface ExercisesSlice {
    exercises: IExercise[];
    chosenFilters: IFilter[];
}

const initialState: ExercisesSlice = {
    exercises: [
        {
            name: 'Pull up',
            description: 'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands, gripping a bar or other implement at a distance typically wider than shoulder-width, and pulled up. As this happens, the elbows flex and the shoulders adduct and extend to bring the elbows to the torso. Pull-ups build up several muscles of the upper body, including the latissimus dorsi, trapezius, and biceps brachii. A pull-up may be performed with overhand (pronated), underhand (supinated)—sometimes referred to as a chin-up—neutral, or rotating hand position. Pull-ups are used by some organizations as a component of fitness tests, and as a conditioning activity for some sports.',
            imageSrc: 'https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up-variations.jpg',
            requiredEquipment: 'horizontal bar',
            muscleGroup: ['back', 'biceps'],
            visible: true,
        },
        {
            name: 'Push up',
            description: 'The push-up (sometimes called a press-up in British English) is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise the pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis and the midsection as a whole.[1] Push-ups are a basic exercise used in civilian athletic training or physical education and commonly in military physical training. They are also a common form of punishment used in the military, school sport, and some martial arts disciplines.',
            imageSrc: 'https://www.fitnesseducation.edu.au/wp-content/uploads/2020/10/Pushups.jpg',
            requiredEquipment: 'body only',
            muscleGroup: ['shoulders'],
            visible: true,
        },
        {
            name: 'Bench press',
            description: 'The bench press, or chest press, is a weight training exercise where the trainee presses a weight upwards while lying on a weight training bench. Although the bench press is a full-body exercise, the muscles primarily used are the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.[1] The barbell bench press is one of three lifts in the sport of powerlifting alongside the deadlift and squat and is the only lift in the sport of Paralympic powerlifting. The bench press is an upper body mass-building exercise that stresses some of the body’s largest muscles, including chest, triceps, shoulders, front deltoids, and even upper back.[2] It is also used extensively in weight training, bodybuilding, and other types of training to develop the chest muscles. Bench press strength is important in combat sports as it tightly correlates to punching power. To improve upper body strength, power, and endurance for athletic, occupational, and functional performance as well as muscle development, the barbell bench press is frequently used. [3]',
            imageSrc: 'https://cdn.muscleandstrength.com/sites/default/files/barbell-bench-press_0.jpg',
            requiredEquipment: 'kettlebells',
            muscleGroup: ['legs', 'chest' ],
            visible: true,
        },
        {
            name: 'Dead lift',
            description: 'The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground. It is one of the three powerlifting exercises, along with the squat and bench press. Deadlift phases Phase 1 Phase 1 Phase 2 Phase 2 Phase 3 Phase 3 Two styles of deadlift are commonly used in competition settings: the sumo deadlift and the standard deadlift. While both of these styles are permitted under the rules of powerlifting competition, only the conventional stance is used in strongman deadlifting contests.',
            imageSrc: 'https://www.shape.com/thmb/TDOFpB64QaVjoBWz82A7c7vomT4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Guide-to-Deadlifts-GettyImages-1368073669-9492fe76328041169af7baf93afe1bc5.jpg',
            requiredEquipment: 'bands',
            muscleGroup: ['legs', 'triceps'],
            visible: true,
        }
    ],
    chosenFilters: []
};

export const exercisesSlice = createSlice( {
    name: 'exercises',
    initialState,
    reducers: {
        addFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters.push(action.payload);
            filterExercises(state.exercises, state.chosenFilters);
        },
        removeFilter: (state, action: PayloadAction<IFilter>) => {
            state.chosenFilters = state.chosenFilters.filter(filter => {
                if (filter.filterGroup === action.payload.filterGroup) {
                    return filter.name !== action.payload.name
                }
                else {
                    return true;
                }
            })
            filterExercises(state.exercises, state.chosenFilters);
        },
        clearFilters: (state) => {
            state.chosenFilters = [];
            filterExercises(state.exercises, state.chosenFilters);
        }
    }
})
export const { addFilter, removeFilter, clearFilters } = exercisesSlice.actions;
export const selectExercises = (state: RootState) => {
    return state.exercises.exercises;
}
export const selectChosenFilters = (state: RootState) => {
    return state.exercises.chosenFilters;
}
export default exercisesSlice.reducer