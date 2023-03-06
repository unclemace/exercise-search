import React from 'react';
import './scss/_main.scss';

//types
import { IFilter } from "./types/types";

//containers
import { FilterContainer } from './containers/filterContainer';
import { ExercisesContainer } from './containers/exercisesContainer';


function App() {
    const filters: IFilter[] =  [
        {
            name: 'body only',
            filterGroup: 'Equipment'
        },
        {
            name: 'bands',
            filterGroup: 'Equipment'
        },
        {
            name: 'kettlebells',
            filterGroup: 'Equipment'
        },
        {
            name: 'horizontal bar',
            filterGroup: 'Equipment'
        },
        {
            name: 'back',
            filterGroup: 'Muscle group'
        },
        {
            name: 'biceps',
            filterGroup: 'Muscle group'
        },
        {
            name: 'triceps',
            filterGroup: 'Muscle group'
        },
        {
            name: 'legs',
            filterGroup: 'Muscle group'
        },
        {
            name: 'chest',
            filterGroup: 'Muscle group'
        },
        {
            name: 'shoulders',
            filterGroup: 'Muscle group'
        },


    ]
    return (
        <div className="App">
          <section className='section section-desktop'>
              <FilterContainer filters={filters}/>
              <ExercisesContainer/>
          </section>
        </div>
    );
}

export default App;
