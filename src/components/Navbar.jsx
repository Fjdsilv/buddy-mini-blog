import { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { setInput, setSignedIn, setUserData, } from '../features/useSlice';

//Material UI style
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

//Material UI style
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '400px',
    },
  }));

//Material UI style
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Navbar = ({ isSigned, setProfile, setIsSigned, setUser }) => {
  const [inputValue, setInputValue] = useState("tech")

  const dispatch = useDispatch();

  const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
        setUser(codeResponse);
        setIsSigned(true)
        
        },
        onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setIsSigned(false)
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  }
  
  const handlClick = () => {
    // e.preventDefault();
    dispatch(setInput(inputValue));
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'text.primary', p: 1, px: 2 }} >
        <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <h2>🤓Buddy Mini Blog✍</h2>
          </Typography>
          {isSigned ? 
          <>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              />
          </Search>
          <Button
            // type="submit"
            onClick={handlClick}
            color="inherit" 
            variant="outlined" 
            sx={{ ml: 1 }}
          >
            Search
          </Button>
          </>
          : 
          ""
          }
          {/* search component */}
          {isSigned ?
          <Button 
            color="inherit"
            onClick={logOut}
          >
          LogOut😌
          </Button>
          :
          <Button 
            color="inherit"
            onClick={login}
          >
          SingUp🤓
          </Button>
          }
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
export default Navbar

