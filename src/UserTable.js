import React from "react";

let UserTable = ({sortedData, Direction, users, keyId}) => { 

  return (    
      <table className="customers">
        <thead>
        <tr>
          <th onClick={() => sortedData('name')}>name {keyId==='name' ? <Direction/> : null} </th>
          <th onClick={() => sortedData('id')}>id {keyId==='id' ? <Direction/> : null} </th>
          <th onClick={() => sortedData('status')} >status {keyId==='status' ? <Direction/> : null}</th>
          <th onClick={() => sortedData('followed')}>followed {keyId==='followed' ? <Direction/> : null}</th>
        </tr>
        </thead>
        <tbody>

        {users.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.id}</td>
            <td>{item.status}</td>
            <td>{item.followed}</td>
          </tr>
          
        ))}
        </tbody>
      </table>
    
  );
}

export default UserTable;
