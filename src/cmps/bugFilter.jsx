/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { SortDropdown } from "./SortDropdown.jsx"
import { MultiSelectDropdown } from "./MultiSelectDropdown.jsx"

export function BugFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 300)).current
    const labels = ["api", "minor", "security", "dev-branch", "bug", "urgent", "validation", "frontend", "need-CR", "critical", "backend", "ux", "performance"];



    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    const { title, severity, sortBy, byLabels } = filterByToEdit
    return (
        <section className="bug-filter ">
            <h2>Bugs Filter</h2>
            <form >
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text"
                        id="title"
                        name="title"
                        placeholder="By title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="severity">Severity:</label>
                    <input type="number"
                        id="severity"
                        name="severity"
                        placeholder="By severity"
                        value={severity}
                        onChange={handleChange}
                    />
                </div>
                <SortDropdown sortBy={sortBy} handleChange={handleChange}></SortDropdown>
                <MultiSelectDropdown
                    options={labels}
                    selectedValues={byLabels}
                    onChange={handleChange}
                    name="byLabels"
                />
            </form>

        </section>
    )
}