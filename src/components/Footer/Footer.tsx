import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './Footer.scss';
import { FooterPropTypes } from "./Footer.types";
import { calculatePagenumbers } from "./Footer.utils";




const Footer : React.FC<FooterPropTypes> = ({currentPage , setCurrentPage ,pageCount}) => {

  const[ pageNumbers , setPageNumbers] = useState<number[]>([])

  const handleClick : React.MouseEventHandler = (e : React.MouseEvent) => {
    e.preventDefault()
    const target = e.target as HTMLButtonElement;

    if(target.innerHTML==='&gt;')
    {
      setCurrentPage(currentPage+1)
  
    }
    else if(target.innerHTML==='&lt;')
    {
      setCurrentPage(currentPage-1)
    }
    else if(target.innerHTML==='...')
    {
      setCurrentPage(currentPage-2)
    }
    else if(target.innerHTML==='....')
    {
      setCurrentPage(currentPage+2)
    }
    else {

      setCurrentPage(Number(target.innerHTML))
    }
    
    }

    useEffect(()=>{
      let pages = calculatePagenumbers(currentPage,pageCount)
      
      setPageNumbers(pages)
    },[currentPage , pageCount])
  
  return (
    <div>
      {pageCount? <div className="pagination-container">
        <button className="page-button" disabled={currentPage===1?true:false} onClick={handleClick}>&lt;</button>
        {
          pageNumbers.map((page,index)=><button key={index} className={page===currentPage?"current-page-button":"page-button"} onClick={handleClick} >{page}</button>)
        }
       
        
        <button className="page-button" disabled={currentPage===pageCount?true:false} onClick={handleClick} >&gt;</button>
      </div> :null}
      
    </div>
  );
};



export default Footer;
