import './App.css';

import React, { useEffect, useState } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';
import DataList from './components/datatable';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

//deneme
function App() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [type, setType] = useState([]);
  const [districtFilt, setDistrictFilt] = useState([]);
  const [addressType, setAddressType] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [employee, setEmployee] = useState({
    employee_name: "",
    employee_surname: "",
    employee_birthday: "",
    employee_birthplace: "",
    city_id: "",
    district_id: "",
    address_type_id: "",

  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/getemployee').then((response) => {
      setPersonalData(response.data.employee);
      setCity(response.data.city);
      setDistrict(response.data.district);
      // setAddressType(response.data.type);
      setType(response.data.type);
    })
  }, [refresh])
  //FUNCTION//
  const onClickSave = () => {
    axios.post('http://127.0.0.1:8000/api/add', { employee }).then((res) => {
      setRefresh(!refresh)
    })
  }

  const onChangeCity = (e) => {
    console.log(e);
    setDistrictFilt(district.filter((district) => e.value === district.city_id));
    setIsDisabled(false);
    setEmployee((value) => ({ ...value, city_id: e.value }));
    setRefresh(!refresh);
  }
  const onChangeDistrict = (e) => {
    console.log(e);
    setEmployee((value) => ({ ...value, district_id: e.value }))
  }

  const onChangeType = (e) => {
    console.log(e);
    setEmployee((value) => ({ ...value, address_type_id: e.value }))
  }
  const onAddType = (e) => {
    console.log(e)
    axios.post('http://127.0.0.1:8000/api/addtype', { type: addressType }).then((res) => {
      setRefresh(!refresh)

    })
  }
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  console.log(type)


  //Personel Register//
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-6'>
          <h2>Add Employee</h2>
          <FormGroup>
            <Label for="name"><h5>Please enter name</h5></Label>
            <Input type="email" name="email" placeholder="Please enter name" value={employee.employee_name} onChange={(e) => setEmployee((value) => ({ ...value, employee_name: e.target.value }))} />
          </FormGroup>
          <FormGroup>
            <Label for="surname"><h5>Please enter surname</h5></Label>
            <Input type="text" name="text" placeholder="Please enter surname" value={employee.employee_surname} onChange={(e) => setEmployee((value) => ({ ...value, employee_surname: e.target.value }))} />
          </FormGroup>
          <FormGroup>
            <Label for="birthday"><h5>Please enter birth day</h5></Label>
            <Input type="date" name="birthday" placeholder="Please enter birth day" value={employee.employee_birthday} onChange={(e) => setEmployee((value) => ({ ...value, employee_birthday: e.target.value }))} />
          </FormGroup>
          <FormGroup>
            <Label for="birthplace"><h5>Please enter birthplace</h5></Label>
            <Input type="text" name="birthplace" placeholder="Please enter birthplace" value={employee.employee_birthplace} onChange={(e) => setEmployee((value) => ({ ...value, employee_birthplace: e.target.value }))} />
          </FormGroup>

        </div>
        <div className='col-lg-6'>
          <h2>Add Address</h2>
          <label><h5>Please select city</h5></label>
          <Select options={city} onChange={(e) => onChangeCity(e)} />
          <label><h5>Please select district</h5></label>
          <Select options={districtFilt} onChange={(e) => onChangeDistrict(e)} isDisabled={isDisabled} />
          <label><h5>Please select type</h5></label>
          <Select options={type} getOptionLabel={(data) => data.label} getOptionValue={data => data.id} onChange={(e) => onChangeType(e)} />
          <div>
            <button className='btn btn-primary' onClick={() => openModal()}>
              AddType
            </button>
            <Modal show={show} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add type</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type="text" className="form-control" id="exampleInputAddressType" value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  placeholder="Please enter type..." />
              </Modal.Body>
              <Modal.Footer>
                <button className='btn btn-warning' onClick={closeModal}>
                  Close
                </button>
                <button className='btn btn-success' onClick={() => onAddType()}  >
                  Save Changes
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <input type="text" className="form-control" id="exampleInputAddressType" placeholder="Please enter phone..." />
        </div>

        <button className='btn btn-success' onClick={() => onClickSave()}>Save</button>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          <DataList personalData={personalData} />
        </div>
      </div>

    </div>

  );
}

export default App;
