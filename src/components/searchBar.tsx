import React, {FC} from 'react';

interface ExercisesSearchBarProps {
    placeholder: string;
    onInputChange: (input: string) => void
}
const SearchBar:FC<ExercisesSearchBarProps> = ({onInputChange, placeholder}) => {
    return (
        <div className='searchbar'>
            <i className="gg-search"></i>
            <input onChange={(e) => onInputChange(e.target.value)} aria-label='searchbar-input' type='text' placeholder={placeholder}/>
        </div>
    )
}

export default SearchBar;

