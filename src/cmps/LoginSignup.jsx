/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { Avatar, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { userService } from '../services/user.service';
import InputFileUpload from './InputFileUpload';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';

const SignupSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

function CustomInput({ handleExternalChange, ...props }) {
    const { name, onChange } = props

    const handleChange = (e) => {
        onChange(e)
        if (handleExternalChange) handleExternalChange(e)
    }

    return (
        <TextField
            {...props}
            id="outlined-basic"
            label={name}
            variant="outlined"
            onChange={handleChange}
        />
    )
}


export function LoginSignup({ onClose, handleSignup, handleLogin }) {

    const [userToEdit, setUserToEdit] = useState(userService.getEmptyUser())
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setUserToEdit(prevUserToEdit => ({ ...prevUserToEdit, [field]: value }))
    }
    function toggleSignup() {
        setIsSignup(!isSignup)
    }
    function CustomButton() {
        const message = isSignup
            ? { text: "Already have an account?", action: "Login!" }
            : { text: "Don't have an account?", action: "Signup!" };
        return (
            <h3>
                {message.text} <a onClick={toggleSignup}>{message.action}</a>
            </h3>
        )

    }
    function onUploaded(imgUrl) {
        setUserToEdit(prevUserToEdit => ({ ...prevUserToEdit, imgUrl }))
    }

    async function onSubmit() {
        try {
            isSignup ? await handleSignup(userToEdit) : await handleLogin(userToEdit);

            onClose();
        } catch (err) {
            console.error(`Cannot ${isSignup ? 'signup' : 'login'}:`, err);
            showErrorMsg(`Cannot ${isSignup ? 'signup' : 'login'}`);
        }
    }

    const { fullname, username, password } = userToEdit
    return (
        <div className='login-signup'>
            <h1>{isSignup ? 'Signup' : 'Login'}</h1>

            <Formik
                enableReinitialize
                initialValues={{
                    fullname: fullname || '',
                    username: username || '',
                    password: password || '',
                }}
                validationSchema={isSignup ? SignupSchema : LoginSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {isSignup && (
                            <>
                                <Avatar className='avatar' alt={userToEdit.fullname} src={userToEdit.imgUrl} />

                                <Field
                                    as={CustomInput}
                                    name="fullname"
                                    handleExternalChange={handleChange}
                                />
                                <ErrorMessage
                                    name="fullname"
                                    component="div"
                                    className="err-msg"
                                />
                            </>
                        )}
                        <Field
                            as={CustomInput}
                            name="username"
                            handleExternalChange={handleChange}
                        />
                        <ErrorMessage className='err-msg' name="username" component="div" />
                        <Field name="password">
                            {({ field }) => (
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        {...field}
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        onChange={(e) => {
                                            handleChange(e)
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? "Hide password" : "Show password"
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            )}
                        </Field>
                        <ErrorMessage className='err-msg' name="password" component="div" />

                        {isSignup && <InputFileUpload onUploaded={onUploaded} />}
                        <CustomButton></CustomButton>

                        <button type="submit" disabled={isSubmitting}>
                            {isSignup ? 'Signup' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )

}