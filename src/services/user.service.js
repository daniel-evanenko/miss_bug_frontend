
import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true,
})
const BASE_URL = 'http://127.0.0.1:3030/api/user/'

export const userService = {
    query,
    getById,
    save,
    remove,
}


async function query() {
    try {
        const { data: users } = await axios.get(BASE_URL)
        return users
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function getById(userId) {
    try {
        const { data: user } = await axios.get(BASE_URL + userId)
        return user
    } catch (err) {
        console.log('err:', err)
        throw err
    }

}
async function remove(userId) {
    try {
        return axios.delete(BASE_URL + userId)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function save(user) {
    const method = user._id ? 'put' : 'post'
    try {
        const { data: savedBug } = await axios[method](BASE_URL + (user._id || ''), user)
        return savedBug
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
