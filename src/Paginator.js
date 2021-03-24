import React from "react";
import styles from './Table.css'

import {useState, useEffect} from 'react'

let Paginator = (props) => {
  const { _page, pageSize, itemsCount, changePage, portionSize=10 } = props;

  let pagesCount = Math.ceil(itemsCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount/portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  let leftPage = portionSize*(portionNumber-1)+1
  let rightPage = portionSize*portionNumber

  return (
    
      


       <nav aria-label="...">
  <ul className="pagination">
  <li className={`page-item ${portionNumber>1 ? '' : 'disabled'  }`}>
      <a className="page-link" href="#" tabindex="-1" onClick={()=>setPortionNumber(portionNumber-1)}>Previous</a>
    </li>

    {pages.filter(p => leftPage<=p && p<=rightPage)
      .map((p) => {
        return (
          <li className="page-item"><a className="page-link" href="#"
            key={p}
            onClick={() => changePage(p)}
           
          >
            {p}
            </a></li>
        );
      })}
      <li className= {`page-item ${portionNumber<portionCount ? '' : 'disabled' }`}>
      <a className="page-link" href="#" onClick= {()=>setPortionNumber(portionNumber+1)}>Next</a>
    </li>

  </ul>
</nav>

    
  );
};


export default Paginator;
