import { useEffect, useState } from "react"
import { msgService } from "../services/msg.service"
import { MsgList } from "../cmps/MsgList"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useUser } from "../context/UserContext"
import { NicePopup } from "../cmps/NicePopup"
import { MsgEdit } from "../cmps/MsgEdit"
import { useBug } from "../context/BugContext"

export function MsgIndex() {

    const [msgs, setMsgs] = useState([])
    const { loggedInUser } = useUser()
    const { bugs, loadBugs } = useBug()
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [msgToEdit, setMsgToEdit] = useState(msgService.getEmptyMsg)

    useEffect(() => {
        loadMsgs()
        loadBugs()
    }, [])

    async function loadMsgs() {
        try {
            const msgs = await msgService.query()
            setMsgs(msgs)
        } catch (error) {
            console.log(error)
        }

    }
    async function onRemoveMsg(msgId) {
        try {
            await msgService.remove(msgId)
            setMsgs(prevMsgs => prevMsgs.filter((msg) => msg._id !== msgId))
            showSuccessMsg('Msg removed')
        } catch (err) {
            console.log('Error from onRemoveMsg ->', err)
            showErrorMsg('Cannot remove msg')
        }

    }

    async function onSubmitMsg(msg) {
        msg.byUserId = loggedInUser._id
        setIsPopupOpen(false)

        if (msg._id) handleEditMsg(msg)
        else handleAddMsg(msg)
    }

    async function handleEditMsg(msgToEdit) {
        try {
            await msgService.save(msgToEdit)
            await loadMsgs()
            showSuccessMsg('msg updated')
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot add msg')
        } finally {
            setMsgToEdit(msgService.getEmptyMsg())
        }
    }

    async function handleAddMsg(msgToAdd) {
        try {
            await msgService.save(msgToAdd)
            await loadMsgs()
            showSuccessMsg('msg added')
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot add msg')
        }
    }

    function onOpenPopup({ msg = msgService.getEmptyMsg() }) {
        setMsgToEdit(msg)
        setIsPopupOpen(true)
    }

    return (
        <>
            <h1>Msgs</h1>
            {loggedInUser && <button onClick={onOpenPopup}>Add Msg Test</button>}
            <MsgList msgs={msgs} onRemoveMsg={onRemoveMsg} ></MsgList>
            {isPopupOpen && <NicePopup header={<h1>{msgToEdit._id ? "Edit msg" : "Add msg"}</h1>} main={<MsgEdit bugs={bugs} msg={msgToEdit} onSubmit={onSubmitMsg} ></MsgEdit>} onClose={() => setIsPopupOpen(false)} />}

        </>
    )
}