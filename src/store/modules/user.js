import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    nickname: '',
    roleId: '',
    roleName: '',
    email: '',
    phone: '',
    createUser: '',
    createTime: '',
    updateTime: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, roleId) => {
    state.roleId = roleId
  },
  SET_ROLE_NAME: (state, roleName) => {
    state.roleName = roleName
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },

  SET_CREATE_USER: (state, createUser) => {
    state.createUser = createUser
  },
  SET_CREATE_TIME: (state, createTime) => {
    state.createTime = createTime
  },
  SET_UPDATE_TIME: (state, updateTime) => {
    state.updateTime = updateTime
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo(0).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { nickname,
          roleId, roleName,
          email, phone, createUser,
          createTime, updateTime } = data

        commit('SET_NICKNAME', nickname)
        commit('SET_AVATAR', roleId)
        commit('SET_ROLE_NAME', roleName)
        commit('SET_EMAIL', email)
        commit('SET_PHONE', phone)
        commit('SET_CREATE_USER', createUser)
        commit('SET_CREATE_TIME', createTime)
        commit('SET_UPDATE_TIME', updateTime)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

