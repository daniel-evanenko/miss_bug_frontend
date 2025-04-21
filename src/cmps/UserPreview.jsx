/* eslint-disable react/prop-types */
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from "@mui/material";

export function UserPreview({ user }) {
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
                    <p> Username: {user.username}</p>
                    <p> Score: {user.score}</p>
                </AccordionDetails>
                <AccordionActions>
                    <Button color="error">Delete</Button>
                    <Button color="warning">Edit</Button>
                </AccordionActions>
            </Accordion>
        </>
    )

}