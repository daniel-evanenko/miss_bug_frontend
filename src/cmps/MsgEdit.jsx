/* eslint-disable react/prop-types */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditMsgSchema = Yup.object().shape({
    txt: Yup.string().required('Txt is required'),
    aboutBugId: Yup.string().required('Related Bug is required'),
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

export function MsgEdit({ msg, onSubmit, bugs }) {

    const [msgToEdit, setMsgToEdit] = useState(msg);

    useEffect(() => {
        setMsgToEdit(msg);
    }, [msg]);

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

        setMsgToEdit(prevMsgToEdit => ({ ...prevMsgToEdit, [field]: value }))
    }
    const { txt, aboutBugId } = msgToEdit;
    return (
        <div className='msg-edit'>
            <Formik
                enableReinitialize
                initialValues={{
                    txt: txt || '',
                    aboutBugId: aboutBugId || '',
                }}
                validationSchema={EditMsgSchema}
                onSubmit={() => onSubmit(msgToEdit)}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <Field
                            as={CustomInput}
                            name="txt"
                            label="Text"
                            handleExternalChange={handleChange}
                        />
                        <ErrorMessage className='err-msg' name="txt" component="div" />

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="aboutBugId-label">Related Bug</InputLabel>
                            <Select
                                labelId="aboutBugId-label"
                                id="aboutBugId"
                                name="aboutBugId"
                                value={aboutBugId}
                                label="Related Bug"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {bugs && bugs.map((bug) => (
                                    <MenuItem key={bug._id} value={bug._id}>
                                        {bug.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            <ErrorMessage className='err-msg' name="aboutBugId" component="div" />
                        </FormControl>

                        <button type="submit" disabled={isSubmitting}>
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}