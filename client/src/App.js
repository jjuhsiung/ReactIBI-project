import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  //unfiltered donors
  const [donorInfo, setDonorInfo] = useState([]);
  //filter by gender
  const [gender_info, setFilterGender] = useState("");
  const [filterDonerInfo, setFilterDoner] = useState([]);
  //filter by search input of file path
  const [filePath_info, setFilePath] = useState("");
  const [filterPathInfo, setFilterPath] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/select", {}).then(response => {
      setDonorInfo(response.data);
    });
  }, []);

  const submitGender = () => {
    Axios.post("http://localhost:3001/api/filterGender", {
      gender: gender_info
    }).then(response => {
      setFilterDoner(response.data);
      console.log(gender_info);
      console.log("submit gender success!");
    });
  };

  const submitSearch = () => {
    Axios.post("http://localhost:3001/api/searchFile", {
      file: filePath_info
    }).then(response => {
      setFilterPath(response.data);
      console.log(filePath_info);
      console.log("submit search success !");
    });
  };

  const renderDonerTable = () => {
    return donorInfo.map(val => {
      return (
        <tr>
          <td>{val.donorID}</td>
          <td>{val.gender}</td>
          <td>{val.medical}</td>
          <td>{val.history}</td>
        </tr>
      );
    });
  };

  const renderFiltDonerTable = () => {
    return filterDonerInfo.map(val => {
      return (
        <tr>
          <td>{val.donorID}</td>
          <td>{val.gender}</td>
          <td>{val.medical}</td>
          <td>{val.history}</td>
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <h1>Donors</h1>
      <div className="form">
        <label>Select Gender</label>
        <br></br>
        <span>Female</span>
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={e => {
            setFilterGender(e.target.value);
          }}
        />
        <span>Male</span>
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={e => {
            setFilterGender(e.target.value);
          }}
        />
        <button onClick={submitGender}>Submit</button>
      </div>
      <h3>--- All donors ---</h3>
      <div className="result">
        <table>
          <thead>
            <tr>
              <th>ID </th>
              <th>Gender </th>
              <th>Medical </th>
              <th>History </th>
            </tr>
          </thead>
          <tbody>{renderDonerTable()}</tbody>
        </table>
      </div>

      <h3>--- Filtered donors ---</h3>
      <div className="result">
        <table>
          <thead>
            <tr>
              <th>ID </th>
              <th>Gender </th>
              <th>Medical </th>
              <th>History </th>
            </tr>
          </thead>
          <tbody>{renderFiltDonerTable()}</tbody>
        </table>
      </div>

      <div className="form">
        <h3>--- Search File Path ---</h3>
        <input
          type="text"
          name="filepath"
          onChange={e => {
            setFilePath(e.target.value);
          }}
        />
        <button onClick={submitSearch}>Submit</button>
      </div>
      <h4>Search Result:</h4>
      <div className="result">
        {filterPathInfo.map(val => {
          return (
            <div>
              {val.donorID} | {val.path} | {val.type}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
