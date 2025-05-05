import { useEffect, useState } from "react"
import { msgService } from "../services/msg.service"
import { MsgList } from "../cmps/MsgList"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useUser } from "../context/UserContext"

export function MsgIndex() {

    const [msgs, setMsgs] = useState([])
    const { loggedInUser } = useUser()

    useEffect(() => {
        loadMsgs()
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

    async function onAddMsg() {
        const msg = {
            txt: prompt('Msg txt?'),
            aboutBugId: '6810b72640327b00d74d3f4f',
            byUserId: loggedInUser._id
        }
        try {
            await msgService.save(msg)
            await loadMsgs()
            showSuccessMsg('msg added')
        } catch (err) {
            console.log('Error from onAddMsg ->', err)
            showErrorMsg('Cannot add msg')
        }
    }
    return (
        <>
            <h1>Msg Index</h1>
            <button onClick={onAddMsg}>Add Msg Test</button>
            <MsgList msgs={msgs} onRemoveMsg={onRemoveMsg} ></MsgList>
        </>
    )
}