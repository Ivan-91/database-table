import axios from "axios";
import React from "react";
import {useState, useEffect} from 'react'
import preloader from './preloader/preloader.gif'
import UserTable from './UserTable'
import styles from './Table.module.css'



//baseUrl
const baseURL = "http://localhost:3000/items";

// component for building a table
function MyTable() {
  const [users, setusers] = useState([]);
  const [currentPage, setcurrentPage] = useState(1)
  const [loading, setloading] = useState(true);
  const [sortDirection, setsortDirection] = useState(true)
  const [keyId, setKeyId] = useState('')


  // change page
  let changePage = (pageNumber) => {
    axios.get(`http://localhost:3000/items?_page=${pageNumber}`).then((res) => {
      setusers(res.data);
      setcurrentPage(pageNumber);
    });
    console.log("page must be change");
  };

  let Paginator = (props) => {
    const { _page, _limit = 10, itemsCount = 100 } = props;

    let pagesCount = Math.ceil(itemsCount / _limit);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <a>
        {pages.map((p) => {
          return (
            <span
              key={p}
              onClick={() => changePage(p)}
              className={currentPage === p ? styles.selectedPage : undefined}
            >
              {" "}{p}{" "}
            </span>
          );
        })}
      </a>
    );
  };

  // filtration
  let Filtration = () => {
    const [value, setvalue] = useState('')


    let onChange=(event)=>{
      setvalue(event.target.value)
    }

    return (
      <a> search on page
      <input value={value} onChange={onChange}></input>
      <button onClick={()=>searchRows(value)} >GO</button>
      </a>
    )
  }

  function filterObjects(objects, filter) {
    filter = filter.toLowerCase();
    var filtered = [];
    var keys = Object.keys(objects);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (objects.hasOwnProperty(key) === true) {
            var object = objects[key];
            var objectAsString = JSON.stringify(object).toLowerCase();
            if (key.toLowerCase().indexOf(filter) > -1 || objectAsString.indexOf(filter) > -1) {
                filtered[key] = object;
            }
        }
    }
    return filtered;
}

  let searchRows = (val) => {
    let copyUsers = users.concat()
    let filteredUsers = filterObjects(copyUsers, val)
    setusers(filteredUsers)
  }

  // sorting direction display
  let Direction = () => {
    return (
    !!sortDirection ? <a>🠕</a> : <a>🠗</a>)
  }

  // sorting data
  let sortedData = (keyId) => {
    let copyUsers = users.concat();
    if (sortDirection === true) {
      copyUsers.sort((a, b) => (a[keyId] > b[keyId] ? 1 : -1));
    } else {
      copyUsers.sort((a, b) => (a[keyId] > b[keyId] ? -1 : 1));
    }
    setusers(copyUsers);
    setsortDirection(!sortDirection);
    setKeyId(keyId)
  };

   //loading data
  useEffect(() => {
    axios.get(baseURL).then((res) => {
      setusers(res.data);
      setloading(false);
    });
  }, []);

  return (
    <div>
      
      {!!loading && (
        <div>
          <img src={preloader} />
          <p>...loading</p>
        </div>
      )}
      <Paginator />
      <Filtration />
      <UserTable sortedData = {sortedData} 
                 Direction = {Direction}
                 users = {users}
                 keyId={keyId}
          />
    </div>
  );
}





export default MyTable;
