
import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:3030/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    downloadPdf,
    getBugsByOwnerId
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
        return axios.delete(BASE_URL + bugId)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function save(bug) {
    const method = bug._id ? 'put' : 'post'
    try {
        const { data: savedBug } = await axios[method](BASE_URL + (bug._id || ''), bug)
        return savedBug
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

async function downloadPdf() {
    try {
        const response = await axios.get(BASE_URL + 'downloadPdf', {
            responseType: 'blob',
        })
        return response.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

function getDefaultFilter() {
    return { title: '', sortBy: 'title', byLabels: [], ownerId: '' }
}

async function getBugsByOwnerId(ownerId) {
    const filterBy = { ownerId }
    try {
        const bugs = await bugService.query(filterBy)
        return bugs
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}