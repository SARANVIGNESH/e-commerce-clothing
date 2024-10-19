import React, { useContext, useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const SignUp = () => {
    const { signUp } = useContext(AuthContext);  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // States for success and error feedback
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setOpenSnackbar(true);
            return;
        }

        try {
            await signUp(email, password);  // Use signUp from context
            setSuccessMessage("User created successfully!");
            setErrorMessage('');  // Clear any previous error message
            setOpenSnackbar(true);

            // Clear form fields after successful signup
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setErrorMessage(error.message || "Failed to create user");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24 flex justify-center items-center'>
            <Box
                className='bg-white p-10 rounded-lg shadow-lg'
                sx={{ width: '400px' }}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        type="text"
                        variant="outlined"
                        required
                        className="bg-gray-50"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        required
                        className="bg-gray-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        className="bg-gray-50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        required
                        className="bg-gray-50"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-700"
                    >
                        Sign Up
                    </Button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to='/login' className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </Box>

            {/* Snackbar for success */}
            <Snackbar open={openSnackbar && successMessage !== ''} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            {/* Snackbar for error */}
            <Snackbar open={openSnackbar && errorMessage !== ''} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignUp;


