/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EditUserSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    score: Yup.number().required('Score is required').positive('Score must be positive'),
})

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



export function UserEdit({ user, onSubmit }) {


    const [userToEdit, setUserToEdit] = useState(user)
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

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

    const { fullname, username, password, score } = userToEdit
    return (
        <div className='user-edit'>
            <Formik
                enableReinitialize
                initialValues={{
                    fullname: fullname || '',
                    username: username || '',
                    password: password || '',
                    score: score || 0
                }}
                validationSchema={EditUserSchema}
                onSubmit={() => onSubmit(userToEdit)}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            as={CustomInput}
                            name="fullname"
                            handleExternalChange={handleChange}
                        />
                        <ErrorMessage className='err-msg' name="fullname" component="div" />
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
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
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

                        <Field
                            as={CustomInput}
                            name="score"
                            type="number"
                            handleExternalChange={handleChange}
                        />
                        <ErrorMessage className='err-msg' name="score" component="div" />

                        <button type="submit" disabled={isSubmitting}>
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )

}