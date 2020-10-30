import React, { Component, Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Popover, TextField, Typography, Select, MenuItem, InputLabel } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const TaskManagement = (props) => {
  const [rows, setRows] = useState('')
  const classes = useStyles();
  let rowsVaue = []
  const columns = [
    { field: 'task_no', headerName: 'Task No', width: 150 },
    { field: 'task_description', headerName: 'Task Description', width: 180 },
    { field: 'start_time', headerName: 'Start Time', width: 250 },
    { field: 'end_time', headerName: 'End Time', width: 250 },
    { field: 'assign_user', headerName: 'Assign User', description: 'This column has a value getter and is not sortable.', width: 250 },
    { field: 'created_by', headerName: 'Create User', width: 250 },
    { field: 'created_date', headerName: 'Create Date', width: 250 },
  ];
  const callTask = async () => {
    await fetch("http://localhost:8000/api/task/",
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response)
        setRows(response)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    callTask()
    userCallList()
  }, []);

  const [task, setTask] = useState([])
  const [taskNo, setTaskNo] = useState([])
  const [taskDesc, setTaskDesc] = useState([])
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userList, setUserList] = useState()
  const [status, setStatus] = React.useState()
  const [user, setUser] = React.useState()
  const handleSubmit = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null);
  };
  const taskInsert = async => {
    fetch('http://127.0.0.1:8000/api/task/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "task_no": taskNo,
        "task_description": taskDesc,
        "start_time": "",
        "end_time": "",
        "assign_user": user,
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  const taskAdd = (event) => {
    event.preventDefault();
    taskInsert();
  };
  const listUser = async() => {
    await fetch("http://localhost:8000/api/userlist/",
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }
    )
      .then(res => res.json())
      .then(response => {
        console.log(response)
        setUserList(response)
      })
      .catch((error) => console.log(error))
  }
  
  const userCallList = (event) =>{
    listUser()
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      {  rows ?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell component="th" scope="Col">
                    {col.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>

              {rows && rows.map((row) => (
                <TableRow>
                  <TableCell>
                    {row.task_no}
                  </TableCell>
                  <TableCell>
                    {row.task_description}
                  </TableCell>
                  <TableCell>
                    {row.start_time}
                  </TableCell>
                  <TableCell>
                    {row.end_time}
                  </TableCell>
                  <TableCell>
                    {row.assign_user_name}
                  </TableCell>
                  <TableCell>
                    {row.create_user_name}
                  </TableCell>
                  <TableCell>
                    {row.created_date}
                  </TableCell>
                </TableRow>

              ))}

            </TableBody>
          </Table>
        </TableContainer>
        :
        <Button onClick={handleSubmit}><Typography> Add New Task </Typography></Button>
      }
           <Button onClick={handleSubmit}><Typography> Add New Task </Typography></Button>
      <Popover
        id={1}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={taskAdd}>
              <TextField id="task no" label="Task No" variant="outlined" />
              <TextField id="task desc" label="Task Description" variant="outlined" multiline rows={5} />
              <TextField
                id="datetime-local"
                label="Start Date"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <MenuItem value={'Started'}>Started</MenuItem>
                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                <MenuItem value={'Finish'}>Finish</MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-label">User List</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user}
                onChange={(event) => setUser(event.target.value)}
              >
                {userList && userList.map((user) => (
                  <MenuItem value={user.id}>{user.username}</MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="button-block"
              >
                Submit
</Button>
            </form>
          </Grid>
        </Grid>
      </Popover>
    </div>
  )
}
export default TaskManagement