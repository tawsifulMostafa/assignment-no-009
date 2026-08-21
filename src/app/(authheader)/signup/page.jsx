import SignupForm from "@/Components/SignupForm/SignupForm"; 


export const metadata ={

title: "signUp"
}

const SignupPage = () => { 
    return (
        <div>
           <SignupForm/>
        </div>
    );
};

export default SignupPage;


// User Registration (/register)
// Form fields:
// Name (text, required)
// Email (email, required)
// Photo URL (text, required – user must provide an image URL; you may also later upload but URL is simpler)
// Password (password, required)
// Password validation (must be checked before submission):
// At least 6 characters
// At least one uppercase letter
// At least one lowercase letter
// If criteria fail, show an inline error message and prevent the form from submitting.
// Buttons:
// Register
// Continue with Google
// On successful registration (email/password):
// Store user in DB, then redirect to Login page.
// Show a success toast “Registration successful! Please login.”
// On Google registration: user is logged in directly and redirected to Home.
// Link to Login page: “Already have an account? Login”
