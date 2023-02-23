import React, { useContext, useEffect, useState, useCallback } from "react";
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Table = (props) => {

    const [filter1Gre, setFilter1Gre] = useState("");
    const [filter1Les, setFilter1Les] = useState("");
    const [filter2Gre, setFilter2Gre] = useState("");
    const [filter2Les, setFilter2Les] = useState("");
    const [filterRange,setFilterRange]= useState(props.filterRange)
    const [filterBool, setFilterBool] = useState(props.filterBool)
    const [tableData,setTableData] = useState(props.data)
    const [filteredData,setFilteredData] = useState(props.data)

    useEffect(() => {
        setTableData(props.data);
        filter(filterBool,filterRange);
    }, [props.data])

    useEffect(() => {
        setFilterBool(props.filterBool)
        setFilterRange(props.filterRange)
        filter(props.filterBool,props.filterRange);
    }, [props.filterBool,props.filterRange])

    const columns = [{
        dataField: "tag1",
        text: "Tag 1",
        sort: true
    },{
        dataField: "tag2",
        text: "Tag 2",
        sort: true
    },{
        dataField: "tag3",
        text: "Tag 3",
        sort: true
    },{
        dataField: "metric1",
        text: "Metric 1",
        sort: true
    },{
        dataField: "metric2",
        text: "Metric 2",
        sort: true
    },{
        dataField: "time",
        text: "Time",
        sort: true
    }]

    const filter = useCallback((filterBool,filterRange) => {
        console.log('filterRunning',filterBool,filterRange)
        if (filterBool===true){
            setFilteredData(props.data.filter(row => {
                    var filterResult = true;
                    if (filterRange[0] != "") filterResult = filterResult && (row.metric1>filterRange[0])
                    if (filterRange[1] != "") filterResult = filterResult && (row.metric1<filterRange[1])
                    if (filterRange[2] != "") filterResult = filterResult && (row.metric2>filterRange[2])
                    if (filterRange[3] != "") filterResult = filterResult && (row.metric2<filterRange[3])
                    return filterResult
                })
            )
        }
        else{
            setFilteredData(props.data)
        }
    },[])

    const reset = () => {
        console.log('reset')
        setFilter1Gre("");
        setFilter1Les("");
        setFilter2Gre("");
        setFilter2Les("");
        console.log(filter1Gre,filter1Les,filter2Les,filter2Gre)
        setTableData(props.data)
    }

  return (
  <>

    <div className="Container">
        <BootstrapTable keyField="key" data = {filteredData} columns = {columns}
        pagination = {paginationFactory()}
        striped
        hover
        condensed
        borderless = {true}
        className="table-sm"
        />

        <button onClick={()=>{
            console.log(filterRange,filterBool)
         }
        }> TableData </button>
    </div>
  </>
  );
};

export default Table;


//import React, { useContext, useEffect, useState } from "react";
//import BootstrapTable from "react-bootstrap-table-next"
//import paginationFactory from "react-bootstrap-table2-paginator"
//import Button from 'react-bootstrap/Button';
//import Form from 'react-bootstrap/Form';
//
//const Table = (props) => {
//
//    const [filter1Gre, setFilter1Gre] = useState("");
//    const [filter1Les, setFilter1Les] = useState("");
//    const [filter2Gre, setFilter2Gre] = useState("");
//    const [filter2Les, setFilter2Les] = useState("");
//    const [tableData,setTableData] = useState(props.data)
//
//    useEffect(() => {
//        setTableData(props.data);
//    }, [props.data])
//
//    const columns = [{
//        dataField: "tag1",
//        text: "Tag 1",
//        sort: true
//    },{
//        dataField: "tag2",
//        text: "Tag 2",
//        sort: true
//    },{
//        dataField: "tag3",
//        text: "Tag 3",
//        sort: true
//    },{
//        dataField: "metric1",
//        text: "Metric 1",
//        sort: true
//    },{
//        dataField: "metric2",
//        text: "Metric 2",
//        sort: true
//    },{
//        dataField: "time",
//        text: "Time",
//        sort: true
//    }]
//
//    const filter = () => {
//        setTableData( tableData.filter(row => {
//            var filterResult = true;
//            if (filter1Gre != "") filterResult = filterResult && (row.metric1>filter1Gre)
//            if (filter1Les != "") filterResult = filterResult && (row.metric1<filter1Les)
//            if (filter2Gre != "") filterResult = filterResult && (row.metric2>filter2Gre)
//            if (filter2Les != "") filterResult = filterResult && (row.metric2<filter2Les)
//            return filterResult
//        })
//        )
//    }
//
//    const reset = () => {
//        console.log('reset')
//        setFilter1Gre("");
//        setFilter1Les("");
//        setFilter2Gre("");
//        setFilter2Les("");
//        console.log(filter1Gre,filter1Les,filter2Les,filter2Gre)
//        setTableData(props.data)
//    }
//
//  return (
//  <>
//
//    <div className="Container">
//        <BootstrapTable keyField="key" data = {tableData} columns = {columns}
//        pagination = {paginationFactory()}
//        striped
//        hover
//        condensed
//        borderless = {true}
//        className="table-sm"
//        />
//
//        <button onClick={()=>{console.log(tableData)}}> TableData </button>
//    </div>
//
//    <form className="FilterContainer">
//          <div className="InputGroup">
//              Metric 1 &nbsp;
//              <input className="myInput" type="number" id="met1Greater" placeholder="Greater Than.." value={filter1Gre} onChange={(e)=> setFilter1Gre(Number(e.target.value)) } />
//              <input className="myInput" type="number" id="met1Lesser" placeholder="Lesser Than.."  value={filter1Les} onChange={(e)=> setFilter1Les(Number(e.target.value)) }  />
//          </div>
//          <div className="InputGroup">
//              Metric 2 &nbsp;
//              <input className="myInput" type="number" id="met2Greater" placeholder="Greater Than.." value={filter2Gre} onChange={(e)=> setFilter2Gre(Number(e.target.value)) } />
//              <input className="myInput" type="number" id="met2Lesser" placeholder="Lesser Than.." value={filter2Les} onChange={(e)=> setFilter2Les(Number(e.target.value)) } />
//          </div>
//          <div className="InputGroup">
//               <Button onClick={filter}> Filter </Button>
//               &nbsp;
//               <Button onClick={reset}> Reset </Button>
//          </div>
//    </form>
//  </>
//  );
//};
//
//export default Table;