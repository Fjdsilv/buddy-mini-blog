import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { setSignedIn, setUserData } from './features/useSlice';
import Navbar from "./components/Navbar"
import Blogs from "./components/Blogs";
import axios from 'axios';

//Material UI style
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState(null);
    const [ isSigned, setIsSigned] = useState(false);

    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                                Authorization: `Bearer ${user.access_token}`,
                                Accept: 'application/json'
                             }
                })
                .then((response) => {
                    console.log(response)
                    setProfile(response.data);
                    setIsSigned(true);
                    dispatch(setSignedIn(true));
                    dispatch(setUserData(response.data))
                })
                .catch((err) => {
                    return err
                });
        }
    }, [user])

    return (
        <>
        <Navbar  
            isSigned={isSigned}
            setIsSigned={setIsSigned}
            setProfile={setProfile}
            setUser={setUser}
        />
        {profile ? 
        <Blogs />
        : 
        <Container sx={{  p: 3, mt: 5 }}>
            <Box sx={{ textAlign: 'center', mt: 30 }}>
                <h2 style={{fontSize: "8rem"}}>📙</h2>
                <h1 style={{fontSize: "3rem"}}>A Readers favourite place!</h1>
                <p style={{fontSize: "2rem", marginTop: "1rem", textTransform: "capitalize"}}>
                We provide high quality online resource for reading blogs. Just sign
                up and start reading some quality blogs.
                </p>
                <Button 
                sx={{ mt: 5  }}
                variant="outlined"
                size="large"
                color="inherit"
                onClick={login}
                >
                Sign in with Google 🚀
                </Button>
            </Box>
        </Container>
        }
        </>
    );
}
export default App;






















