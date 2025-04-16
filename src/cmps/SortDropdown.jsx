/* eslint-disable react/prop-types */

export function SortDropdown({ sortBy, handleChange }) {

    const sortByOpts = ['title', 'severity', 'createdAt']

    return (
        <div className="dropdown">
            <label htmlFor="sortBy">Sort by:</label>
            <select value={sortBy} onChange={handleChange} name="sortBy">
                {sortByOpts.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    )
}