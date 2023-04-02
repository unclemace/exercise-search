import React from 'react';
import './scss/_main.scss';

//types
import { IFilter } from './types/types';

//containers
import { FilterContainer } from './containers/filterContainer';
import { ExercisesContainer } from './containers/exercisesContainer';


function App() {
    const filters: IFilter[] =  [
        {
            values: ['body only', 'bands', 'kettlebells', 'horizontal bar' ],
            filterGroup: 'Equipment'
        },
        {
            values: ['back', 'biceps', 'triceps', 'legs', 'chest', 'shoulders'],
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
