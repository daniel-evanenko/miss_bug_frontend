
import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true,
})
const BASE_URL = 'http://127.0.0.1:3030/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}


async function query(filterBy = {}) {
    try {
        const { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
        return bugs
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function getById(bugId) {
    try {
        const { data: bug } = await axios.get(BASE_URL + bugId)
        return bug
    } catch (err) {
        console.log('err:', err)
        throw err
    }

}
async function remove(bugId) {
    try {
        const { data: bug } = await axios.get(BASE_URL + bugId + '/remove')
        return bug
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function save(bug) {
    try {
        const { data: savedBug } = await axios.get(BASE_URL + 'save', { params: bug })
        return savedBug
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

function getDefaultFilter() {
    return { title: '', severity: '' }
}