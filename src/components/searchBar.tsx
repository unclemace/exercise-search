import React, {FC} from 'react';

interface ExercisesSearchBarProps {
    placeholder: string;
    onInputChange: (input: string) => void
}
export const SearchBar:FC<ExercisesSearchBarProps> = ({onInputChange, placeholder}) => {
    return (
        <div className='searchbar'>
            <i className="gg-search"></i>
            <input onChange={(e) => onInputChange(e.target.value)} type='text' placeholder={placeholder}/>
        </div>
    )
}

