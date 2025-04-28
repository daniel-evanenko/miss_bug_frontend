import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import { BugFilter } from '../cmps/bugFilter.jsx'
import { utilService } from '../services/util.service.js'
import { useUser } from '../context/UserContext.jsx'
import { useBug } from '../context/BugContext.jsx'


export function BugIndex() {
    const { loggedInUser } = useUser()
    const { bugs, loadBugs, addBug, updateBug, removeBug } = useBug();
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())


    useEffect(() => {
        loadBugs(filterBy)
    }, [filterBy])

    function isAllowed() {
        return loggedInUser
    }

    async function onRemoveBug(bugId) {
        try {
            await removeBug(bugId)
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddBug() {
        const owner = {
            _id: loggedInUser?._id || '',
            fullname: loggedInUser?.fullname || ''
        }
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug description'),
            createdAt: Date.now(),
            labels: utilService.getRandomLabels(),
            owner
        }
        try {
            await addBug(bug)
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const description = prompt('New description?')
        const bugToSave = { ...bug, severity, description }
        try {

            await updateBug(bugToSave)
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Error from onEditBug ->', err)
            showErrorMsg('Cannot update bug')
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    async function onDownloadBugs() {
        try {
            const pdfBlob = await bugService.downloadPdf()
            const url = window.URL.createObjectURL(pdfBlob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'bugs.pdf'
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Failed to download PDF:', err)
        }
    }
    return (
        <section >
            <BugFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} ></BugFilter>
            <main>
                {isAllowed() && (
                    <>
                        <button onClick={onAddBug}>Add Bug ⛐</button>
                        <button onClick={onDownloadBugs}>Download Bugs ⛐</button>
                    </>
                )}
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </section>
    )
}
