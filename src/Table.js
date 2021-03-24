import axios from "axios";
import React from "react";

import {useState, useEffect} from 'react'
import preloader from './preloader/preloader.gif'
import UserTable from './UserTable'
import _  from 'lodash'
import Paginator from "./Paginator";



//baseUrl
const baseURL = "http://localhost:3000/items";

// component for building a table
function MyTable() {
  const [users, setusers] = useState([]);
  const [currentPage, setcurrentPage] = useState(1)
  const [loading, setloading] = useState(true);
  const [sortDirection, setsortDirection] = useState(true)
  const [keyId, setKeyId] = useState('')
  const [itemsCount, setitemsCount] = useState(100)
  const [allusers, setallusers] = useState([])

  const pageSize = 5

  //loading data
  useEffect(() => {
    axios.get(`${baseURL}?_page=${currentPage}&_limit=${pageSize}`).then((res) => {
      setusers(res.data);
      setloading(false);      
    })
    .then(axios.get(baseURL).then( res=>setallusers(res.data)))
  }, []);

  // change page
  let changePage = (pageNumber) => {
    axios.get(`http://localhost:3000/items?_page=${pageNumber}&_limit=${pageSize}`).then((res) => {
      setusers(res.data);
      setcurrentPage(pageNumber);
    });
    console.log("page must be change");
  };

  


  // filtration
  let Filtration = () => {
    const [value, setvalue] = useState('')


    let onChange=(event)=>{
      setvalue(event.target.value)
    }

    return (
      <form class="form-inline">
<a class="input-group mb-3">
  <input value={value} onChange={onChange} type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
  <button onClick={()=>searchRows(value)}  class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
</a>

      </form>
      
    )
  }

  let searchRows = (val) => {
    if (!val) {
      setusers(users);
      console.log(users);
    } else {
      console.log(allusers);
      let copyUsers = allusers.concat();
      let filteredUsers = filterObjects(copyUsers, val);
      setusers(filteredUsers);
      console.log(filteredUsers);
    }
  };
  
  let filterObjects=(objects, filter) => {
    filter = filter.toLowerCase();
    let filtered = [];
    let keys = Object.keys(objects);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (objects.hasOwnProperty(key) === true) {
            let object = objects[key];
            let objectAsString = JSON.stringify(object).toLowerCase();
            if (key.toLowerCase().indexOf(filter) > -1 || objectAsString.indexOf(filter) > -1) {
                filtered[key] = object;
            }
        }
    }
    return filtered;
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
      //copyUsers.sort((a, b) => (a[keyId] > b[keyId] ? 1 : -1));
      copyUsers = _.orderBy(copyUsers, keyId, 'asc')
    } else {
      copyUsers = _.orderBy(copyUsers, keyId, 'desc')
      //copyUsers.sort((a, b) => (a[keyId] > b[keyId] ? -1 : 1));
    }
    setusers(copyUsers);
    setsortDirection(!sortDirection);
    setKeyId(keyId)
  };

   

  return (
    <div>
      
      {!!loading && (
        <div>
          <img src={preloader} />
          <p>...loading</p>
        </div>
      )}
      <Paginator  changePage={changePage} 
                  pageSize={pageSize} 
                  currentPage={currentPage} 
                  itemsCount={itemsCount} />
      
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
