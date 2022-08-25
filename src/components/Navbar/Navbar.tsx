import React from 'react';
import './navbar.scss';

type Props = {
    setSearchString : Function,
    setSortValue: Function
}

const Navbar = ({setSearchString , setSortValue} : Props) => {

    const handleSelectChange = (e : React.ChangeEvent ) => {
        const target = e.target as HTMLSelectElement;
        console.log(target.value)
        setSortValue(target.value)
    }

    const handleSearchChange = (e : React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value)
        setSearchString(target.value)
    }

    const debounceSearch = (func : Function , delay : number) => {
        let timer : number | undefined | ReturnType<typeof setTimeout>

        return function(){
            const context =this
            const args = arguments
            clearTimeout(timer)
            timer = setTimeout(()=>func.apply(context,args) , 1000)
        }
    }

    return(
        <div className='nav-container'>
            <div >
            <select className='nav-filter' id="sort" onChange={handleSelectChange}>
             <option value="A-Z">Name A-Z</option>
             <option value="Z-A">Name Z-A</option>
             {/* <option value="Rank-Ascending">Rank &uarr;</option>
             <option value="Rank-Descending">Rank &darr;</option> */}
            </select>
            </div>
            <div  >
            <input className='nav-search' type="text" onChange={debounceSearch(handleSearchChange,1000)} />
            </div>

            

        </div>
    )
}

export default Navbar;