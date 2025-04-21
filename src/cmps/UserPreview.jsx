/* eslint-disable react/prop-types */
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from "@mui/material";

export function UserPreview({ user, onRemoveUser, onEditUser }) {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="fullname"
                    id="fullname"
                >
                    <h3> {user.fullname}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <p> Fullname: {user.fullname}</p>
                    <p> Username: {user.username}</p>
                    <p className="password" data-secret={" " + user.password}>
                        Password:
                        <span className="masked"> ******</span>
                    </p>
                    <p> Score: {user.score}</p>
                </AccordionDetails>
                <AccordionActions>
                    <Button color="error" onClick={()=> onRemoveUser(user._id)}>Delete</Button>
                    <Button color="warning" onClick={()=> onEditUser({user})}>Edit</Button>
                </AccordionActions>
            </Accordion>
        </>
    )

}