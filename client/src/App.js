import React, { useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
      
  const [displayData, setDisplayData] = useState([])
  const [displayTables, setDisplayTable] = useState([])
  const [displayComments, setDisplayComments] = useState([])

  const [columns , setColumns] = useState([])
  const [bgColor,setBgColor]= useState("none");
 
  const Display = () => { 
    Axios.get('http://localhost:3001/api/get').then((response => {
    setDisplayData(response.data)
 }));
  }

  const Show = (TableName) => {
   
    Axios.get('http://localhost:3001/api/get/'+ TableName).then((response => {
      const {tableData,comments} = response.data
      setBgColor(tableData.length>0?'lightgrey':'white')
      setDisplayTable(tableData)
      let keys = Object.keys(tableData[0])
      setColumns(keys)
      setDisplayComments(comments)
    }));

  
  }
  const Table = () => (
  <table >
  <thead>
    {columns.map(column => (        
          <th className="col1">{column}</th>    
    ))}
  </thead>

  <tbody >
    {displayTables.map((row, i) => {
      return (
        <tr>
          {columns.map(cell => {
            return <td>{row[cell]}</td>;
          })}
        </tr>
      );
    })}

  </tbody>
</table>)

  return (
    <div className="App">
   <div className="head" style={{backgroundColor:bgColor}}> {displayComments.map(item => <p> {item["substring_index(table_comment,';',1)"]}</p> 

    )}</div>
      <div className="disL">
      <button  onClick={Display}> Show Tables </button>
      </div>
      <div className="vll"></div>
      <div className="disR">
       
        <div className="just"> 
        {displayData.map(data=>
        <button onClick={() => Show(data.Tables_in_demo1) }> {data.Tables_in_demo1} </button>)}
        </div>
        <div className="vl"></div>
        <div className="Scroll" style={{backgroundColor:bgColor}}>
        <Table/>
        
        </div>
      </div>
    </div>
  )
}

export default App;