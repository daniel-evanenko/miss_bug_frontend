

export function BugPreview({ bug }) {
    return <article >
        <h4>{bug.title}</h4>
        <h1>🐛</h1>
        <p>Owner: <span>{bug.owner.fullname}</span></p>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Description: <span>{bug.description}</span></p>
    </article>
}