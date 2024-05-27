import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function User() {

    const paperStyle={
        padding:"50px 20px",
        width:600, 
        margin:"20px auto",
    }
    const[username,setUsername]=React.useState('')
    const[password,setPassword]=React.useState('')
    const[users,setUsers]=React.useState([])
    const classes= useStyles();
    
    const handleClick=(e)=>{
        e.preventDefault()
    const user={username,password}
    console.log(user)
    fetch("http://localhost:8080/user/add",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user)
    }).then(()=>{
        console.log("User registered successfully")
    })
    }
    React.useEffect(()=>{
        fetch("http://localhost:8080/user/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setUsers(result);
        }
    )},[])
  return (
   
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1>New User Registration</h1>
            <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
      value={username}
      onChange={(e)=>setUsername(e.target.value)}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>
      <Button variant="contained" color='primary' onClick={handleClick}>REGISTER</Button>
      </form>
    
    </Paper>
    <Paper elevation={3} style={paperStyle}>
            {users.map(user=>(
                <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={user.Userid}>
                    Id:{user.id}<br/>
                    Username:{user.username}<br/>
                    Password:{user.password}<br/>
                </Paper>
            ))}
    </Paper>
    </Container>
  );
}
