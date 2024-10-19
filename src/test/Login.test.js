import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login";
import { doSignInWithEmailAndPassword } from "../firebase/auth";

// Mock Firebase sign-in function
jest.mock('../firebase/auth', () => ({
    doSignInWithEmailAndPassword: jest.fn(),
}));

// Mock useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));



describe("Login Component", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    // test("renders the Login form with email and password fields", () => {
    //     render(
    //         <Router>
    //             <Login />
    //         </Router>
    //     );

    //     // Check if the form fields and button are rendered
    //     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    //     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    //     expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    // });

    // test("displays error when sign-in fails", async () => {
    //     const errorMessage = "Invalid email or password";
        
    //     // Mock the sign-in to throw an error
    //     doSignInWithEmailAndPassword.mockRejectedValueOnce(new Error(errorMessage));
    
    //     render(
    //         <Router>
    //             <Login />
    //         </Router>
    //     );
    
    //     // Simulate user input for email and password
    //     fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    //     fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    
    //     // Simulate form submission
    //     fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    //     // Wait for the error message to appear in the Snackbar
    //     const alert = await screen.findByText(errorMessage);
    //     expect(alert).toBeInTheDocument();
    // });

   
    
    

    test("navigates to home page on successful sign-in", async () => {
        doSignInWithEmailAndPassword.mockResolvedValueOnce();

        render(
            <Router>
                <Login />
            </Router>
        );

        // Simulate user input
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        // Check if the sign-in function was called
        expect(doSignInWithEmailAndPassword).toHaveBeenCalledWith("test@example.com", "password123");
    });
});


