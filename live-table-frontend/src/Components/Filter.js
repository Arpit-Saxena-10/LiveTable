import React, { useContext, useEffect, useState, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Filter = (props) => {

    const [filter1Gre, setFilter1Gre] = useState("");
    const [filter1Les, setFilter1Les] = useState("");
    const [filter2Gre, setFilter2Gre] = useState("");
    const [filter2Les, setFilter2Les] = useState("");

    const filter = () => {
//        setTableData( tableData.filter(row => {
//            var filterResult = true;
//            if (filter1Gre != "") filterResult = filterResult && (row.metric1>filter1Gre)
//            if (filter1Les != "") filterResult = filterResult && (row.metric1<filter1Les)
//            if (filter2Gre != "") filterResult = filterResult && (row.metric2>filter2Gre)
//            if (filter2Les != "") filterResult = filterResult && (row.metric2<filter2Les)
//            return filterResult
//        })
//        )
          props.filterChangeCallback(true,[filter1Gre,filter1Les,filter2Gre,filter2Les])
          console.log('filter')
    }

    const reset = () => {
        console.log('reset')
        setFilter1Gre("");
        setFilter1Les("");
        setFilter2Gre("");
        setFilter2Les("");
        props.filterChangeCallback(false,["","","",""])
        console.log(filter1Gre,filter1Les,filter2Les,filter2Gre)
//        setTableData(props.data)
    }

  return (
  <>
    <form className="FilterContainer">
          <div className="InputGroup">
              Metric 1 &nbsp;
              <input className="myInput" type="number" id="met1Greater" placeholder="Greater Than.." value={filter1Gre} onChange={(e)=> setFilter1Gre(Number(e.target.value)) } />
              <input className="myInput" type="number" id="met1Lesser" placeholder="Lesser Than.."  value={filter1Les} onChange={(e)=> setFilter1Les(Number(e.target.value)) }  />
          </div>
          <div className="InputGroup">
              Metric 2 &nbsp;
              <input className="myInput" type="number" id="met2Greater" placeholder="Greater Than.." value={filter2Gre} onChange={(e)=> setFilter2Gre(Number(e.target.value)) } />
              <input className="myInput" type="number" id="met2Lesser" placeholder="Lesser Than.." value={filter2Les} onChange={(e)=> setFilter2Les(Number(e.target.value)) } />
          </div>
          <div className="InputGroup">
               <Button onClick={filter}> Filter </Button>
               &nbsp;
               <Button onClick={reset}> Reset </Button>
          </div>
    </form>
  </>
  );
};

export default Filter;