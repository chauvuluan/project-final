import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Input, Popconfirm, Table, Modal } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getEmployees } from '../api/api';
import { apiEndpoint } from '../config'
import { EditOutlined } from '@ant-design/icons';
const axios = require('axios')
// import Axios from 'axios'

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);


  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    //alert("ok")
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const Content = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(2);
  const [item, setItem] = useState([]);
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  const handleNameChange = (event) => {

    var target = event.target;
    var name = target.name;
    var value = target.value;
    let a = { ...item };
    a[name] = value;
    setItem(a)
    console.log(a)
  }
 const handleFile =(event)=>{
  const fileImage = event.target.files
  setFile(fileImage[0])
 }

  
  const getUploadUrl = async () => {

    await axios.post(`${apiEndpoint}/employees/${item.employeeId}/attachment`,
      ''
      , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('isAuthenticated')}`
        }
      },
    )
      .then(function (response) {
       
         axios.put(response.data.uploadUrl,file)
      
    
      .then(function (response) {
        setUrl(response)
        window.location.reload();
      })   
      })
      

    //   await axios.post(`${apiEndpoint}/employees/${employeesId}/attachment`,
    //   , {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${localStorage.getItem('isAuthenticated')}`
    //     }
    //   },
    // )
    //   .then(function (response) {
    //     console.log(response.data.item)
    //     // setDataSource(response.data.item)
    //     fetchdata()
    //     setOpen(false)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

  }



  const onEmployCreate = async () => {

    await axios.post(`${apiEndpoint}/employees`,
      JSON.stringify(item)
      , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('isAuthenticated')}`
        }
      },
    )
      .then(function (response) {
        console.log(response.data.item)
        // setDataSource(response.data.item)
        fetchdata()
        setOpen(false)
      })
      .catch(function (error) {
        alert("not blank name")
      });

  }

 const handleFileChange =(event)=>{
  const files = event.target.files
  console.log(files)


  }
  useEffect( () => {
    

    console.log("------content------", props.data.getIdToken())
    axios.get(`${apiEndpoint}/employees`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('isAuthenticated')}`
      }
    })
      .then(function (response) {
       
        console.log(response.data.employees);
        setDataSource(response.data.employees)
      })
      .catch(function (error) {
     
        console.log(error);
      })
      .then(function () {
        
      });

  }, []);

  const fetchdata = async () => {
    await axios.get(`${apiEndpoint}/employees`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('isAuthenticated')}`
      }
    })
      .then(function (response) {

        console.log(response.data.employees);
        setDataSource(response.data.employees)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
       
      });
  }



  const handleDelete = async (key) => {
  await  axios.delete(`${apiEndpoint}/employees/${key}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('isAuthenticated')}`
      }
    })
      .then(function (response) {
       
        fetchdata()
        
      })
      .catch(function (error) {
       
        console.log(error);
      })
      .then(function () {

      });
  };



  const onEdit = async () => {
    getUploadUrl()
    //setOpenEdit(true)
    console.log("////",item.name)
   await axios.patch(`${apiEndpoint}/employees/${item.employeeId}`,
    {
      "name": item.name,
      "department": item.department,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('isAuthenticated')}`
      }
    })
      .then(function (response) {
        setOpenedit(false)
        fetchdata()
        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      // window.location.reload();
  }



  const handleEdit = (key) => {
    setOpenedit(true)
    setItem(key)
  };

const defaultColumns = [
  {
    title: 'name',
    dataIndex: 'name',
    // width: '30%',
    // editable: true,
  },
  {
    title: 'avata',
    dataIndex: 'attachmentUrl',
    // render: (t, r) => <img src={`${r.attachmentUrl}`} />
    render: attachmentUrl =><img src={attachmentUrl} style={{ height: '50px', width: '50px'}} />
      



  },
  {
    title: 'department',
    dataIndex: 'department',
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'delete',
    dataIndex: 'delete',
    render: (_, record) =>
      dataSource.length >= 1 ? (
        <div><Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.employeeId)}>
          <a>Delete</a>
        </Popconfirm>
          &ensp;
          <EditOutlined  onClick={() => handleEdit(record)}/>
           
          </div>


      ) : null,
  },


];

const handleAdd = () => {
  const newData = {
    key: count,
    name: `Edward King ${count}`,
    age: '32',
    address: `London, Park Lane no. ${count}`,
  };
  setDataSource([...dataSource, newData]);
  setCount(count + 1);
};

const handleSave = (row) => {
  alert("ok")
  const newData = [...dataSource];
  const index = newData.findIndex((item) => row.key === item.key);
  const item = newData[index];
  newData.splice(index, 1, { ...item, ...row });
  setDataSource(newData);
};

const components = {
  body: {
    // row: EditableRow,
    // cell: EditableCell,
  },
};
const columns = defaultColumns.map((col) => {
  if (!col.editable) {
    return col;
  }

  return {
    ...col,
    onCell: (record) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave,
    }),
  };
});
const [openedit, setOpenedit] = useState(false);
const [open, setOpen] = useState(false);
return (
  <div>
    <Button
      onClick={() => setOpen(true)}
      type="primary"
      style={{
        marginBottom: 16,
      }}
    >
      Add a row
    </Button>
    <Table
      components={components}
      // rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={columns}
    />
    <Modal
      title="add"
      centered
      open={open}
      onOk={onEmployCreate}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <Input placeholder="name" name="name" onChange={handleNameChange} />
      <hr></hr>
      <Input placeholder="department" name="department" onChange={handleNameChange} />
      {/* <hr></hr> */}
      

    </Modal>
    <Modal
      title="Update"
      centered
      open={openedit}
      // onOk={onEdit}
      onCancel={() => setOpenedit(false)}
      footer={[
        <Button key="back" onClick={() => setOpenedit(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary"  onClick={onEdit} >
          Submit
        </Button>,
      
      ]}
      width={1000}
    >
      <Input placeholder="name" name="name" value={item.name} onChange={handleNameChange} />
      <hr></hr>
      <Input placeholder="department" name="department"  value={item.department} onChange={handleNameChange} />
      {/* <hr></hr> */}
      <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={handleFile}
            />
     
    </Modal>


    {/* <img  src={item.attachmentUrl} /> */}
  </div>
);
};

export default Content;