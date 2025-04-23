
import Axios from 'axios'
const axios = Axios.create({
    withCredentials: true,
})
const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:3030/api/'

const BASE_USER_URL = BASE_URL + 'user/'
const BASE_AUTH_URL = BASE_URL + 'auth/'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    query,
    getById,
    save,
    remove,
    getEmptyUser,
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,

}


async function query() {
    try {
        const { data: users } = await axios.get(BASE_USER_URL)
        return users
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function getById(userId) {
    try {
        const { data: user } = await axios.get(BASE_USER_URL + userId)
        return user
    } catch (err) {
        console.log('err:', err)
        throw err
    }

}
async function remove(userId) {
    try {
        return axios.delete(BASE_USER_URL + userId)
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}
async function save(user) {
    const method = user._id ? 'put' : 'post'
    try {
        const { data: savedUser } = await axios[method](BASE_USER_URL + (user._id || ''), user)
        if (getLoggedinUser()?.id === savedUser.id) saveLocalUser(savedUser)

        return savedUser
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

function getEmptyUser() {
    return {
        username: '',
        fullname: '',
        password: '',
        imgUrl: '',
    }
}
async function login(credentials) {
    const { data: user } = await axios.post(BASE_AUTH_URL + 'login', credentials)
    console.log('user', user);
    if (user) {
        return saveLocalUser(user)
    }
}
async function signup(credentials) {

    const { data: user } = await axios.post(BASE_AUTH_URL + 'signup', credentials)
    return saveLocalUser(user)
}

async function logout() {
    await axios.post(BASE_AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

