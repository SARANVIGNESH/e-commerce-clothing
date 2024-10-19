import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); 
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await doSignInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);  // Set error message
            setOpenSnackbar(true);    // Show Snackbar
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);  // Close Snackbar
    };

    return (
        <div className='h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24 flex justify-center items-center relative'>
            {/* Back Arrow Icon */}
            <div className="absolute top-10 left-10 cursor-pointer">
                <Link to='/'>
                    <IoMdArrowRoundBack size={30} />
                </Link>
            </div>

            <Box
                className='bg-white p-10 rounded-lg shadow-lg'
                sx={{ width: '400px' }}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                
                <form className="space-y-6" onSubmit={handleSignIn}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        className="bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        className="bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-700"
                    >
                        Login
                    </Button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link to='/signup' className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </Box>

            {/* Snackbar for error handling */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;




