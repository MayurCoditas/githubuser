import React from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import './navbar.scss';

type Props = {
    setSearchString : Function,
    setSortValue: Function
}

const Navbar = ({setSearchString , setSortValue} : Props) => {

    const [searchStr, setSearchStr] = useState<string>('')

    const handleSearchClick = (e :React.MouseEvent) => {
        setSearchString(searchStr)
    }


    return(
        <div className='nav-container'>
            <div>
            <select className='nav-filter' id="sort" onChange={(e)=>handleChange(e,setSortValue)}>
             <option value="A-Z">Name A-Z</option>
             <option value="Z-A">Name Z-A</option>
            </select>
            </div>
            <div>
            <input className='nav-search' type="text" onChange={(e)=>handleChange(e,setSearchStr)} />
            <Button buttonType='search-button' handleClick={handleSearchClick}><i className="fa fa-search"></i></Button>
            </div>
        </div>
    )
}

const handleChange : Function =(e : React.ChangeEvent , setValue : Function) => {
    const target = e.target as HTMLSelectElement;
        console.log(target.value)
        setValue(target.value)
}

export default Navbar;