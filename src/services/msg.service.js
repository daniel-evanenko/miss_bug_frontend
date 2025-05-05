
import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/msg/' :
    '//localhost:3030/api/msg/'

export const msgService = {
    query,
    getById,
    save,
    remove,
}


async function query(filterBy = {}) {
    try {
        const { data: msgs } = await axios.get(BASE_URL, { params: filterBy })
        return msgs
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function getById(msgId) {
    try {
        const { data: msg } = await axios.get(BASE_URL + msgId)
        return msg
    } catch (err) {
        console.log('err:', err)
        throw err
    }

}
async function remove(msgId) {
    try {
        return axios.delete(BASE_URL + msgId)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function save(msg) {
    const method = msg._id ? 'put' : 'post'
    try {
        const { data: savedMsg } = await axios[method](BASE_URL + (msg._id || ''), msg)
        return savedMsg
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
