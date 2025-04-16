import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import { BugFilter } from '../cmps/bugFilter.jsx'
import { utilService } from '../services/util.service.js'


export function BugIndex() {
    const [bugs, setBugs] = useState([])
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())

    useEffect(() => {
        loadBugs()
    }, [filterBy])

    async function loadBugs() {
        const bugs = await bugService.query(filterBy)
        setBugs(bugs)
    }

    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            console.log('Deleted Succesfully!')
            setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug description'),
            createdAt: Date.now(),
            labels: utilService.getRandomLabels()
        }
        try {
            const savedBug = await bugService.save(bug)
            console.log('Added Bug', savedBug)
            setBugs(prevBugs => [...prevBugs, savedBug])
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const description = +prompt('New description?')
        const bugToSave = { ...bug, severity, description }
        try {

            const savedBug = await bugService.save(bugToSave)
            console.log('Updated Bug:', savedBug)
            setBugs(prevBugs => prevBugs.map((currBug) =>
                currBug._id === savedBug._id ? savedBug : currBug
            ))
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
            <h3>Bugs App</h3>
            <BugFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} ></BugFilter>
            <main>
                <button onClick={onAddBug}>Add Bug ⛐</button>
                <button onClick={onDownloadBugs}>Download Bugs ⛐</button>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </section>
    )
}
