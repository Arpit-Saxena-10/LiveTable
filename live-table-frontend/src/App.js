//import './App.css';
//import Table  from './Components/Table.js'
//import io from 'socket.io-client';
//import React, { useState, useEffect, useRef, useCallback } from 'react';
//import {data} from './static-data/static-table-data.js'
//
//function App() {
//
//  const connectionsRef = useRef([]);
//  const tableDataRef = useRef(data);
//
//  const handleGreeting = useCallback((clientID) => {
//    console.log('Established connection with Client ',clientID);
//  }, []);
//
//  const handleDataEvent = useCallback((row) => {
//    console.log('row received',row);
//    tableDataRef.current = [row,...tableDataRef.current];
//  }, []);
//
//  useEffect(() => {
//
//    const socket1 = io('http://localhost:5000');
//
//    // Store the connections in the state variable
//    connectionsRef.current = [socket1];
//
//    socket1.on("greeting", handleGreeting);
//    socket1.on("data_event", handleDataEvent);
//
//    return () => {
//      // Close the connections when the component unmounts
//      connectionsRef.current.forEach(socket => socket.close());
//    };
//  }, []);
//
//  return (
//    <>
//    <div className="App">
//        <div className="Navbar">
//            Table With Live Data Streamed From Multiple Clients
//        </div>
//            <Table key={tableDataRef.current.length} data={tableDataRef.current}/>
//        <div className="RowCount">
//            Received {tableDataRef.current.length} rows from Client 1
//        </div>
//    </div>
//    </>
//  );
//}
//
//export default App;



import './App.css';
import Table  from './Components/Table.js'
import Filter  from './Components/Filter.js'
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import {data} from './static-data/static-table-data.js'

function App() {

  const [connections,setConnections] = useState([])
  const [tableData,setTableData] = useState(data)
  const [filterBool,setFilterBool] = useState(false);
  const [filterRange,setFilterRange] = useState(["","","",""]);

  useEffect(() => {

    const socket1 = io('http://localhost:5000');

    // Store the connections in the state variable
    setConnections([socket1]);

    socket1.on("greeting", (clientID) => {
        console.log('Established connection with Client ',clientID)
    })
    socket1.on("data_event", (row) => {
//        console.log('row received',row);
        setTableData(prevData => [row,...prevData])
    })

    return () => {
      // Close the connections when the component unmounts
      socket1.close();
    };
  }, []);

  const handleFilterChange = (filterBoolParam,filterRangeParam) => {
    console.log(filterBoolParam,filterRangeParam,tableData.length.toString()+filterBool+filterRange)
    setFilterBool(filterBoolParam)
    setFilterRange(filterRangeParam)

  }

  return (
    <>
    <div className="App">
        <div className="Navbar">
            Table With Live Data Streamed From Multiple Clients
        </div>
            <Table key={tableData.length.toString()+filterBool+filterRange} data={tableData} filterBool={filterBool} filterRange={filterRange}/>
            <Filter filterChangeCallback = {handleFilterChange}/>
        <div className="RowCount">
            Received {tableData.length} rows from Client 1
        </div>
    </div>
    </>
  );
}

export default App;
