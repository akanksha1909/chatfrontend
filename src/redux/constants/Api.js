
import {browserHistory} from 'react-router'

export function setToken(token) {
    localStorage.setItem('token', token)
}

export function removeToken() {
    localStorage.removeItem('token')
    localStorage.removeItem('ai_score')
    localStorage.removeItem('moodsbg')
    localStorage.removeItem('moodscover')
}

export function getBasePath() {
    /*if (process.env.NODE_ENV === 'development') {
        return ''
    }*/
    return 'http://localhost:3000'
}

export function fetchJson(url, conf) {
    
    return fetch( getBasePath() + url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        ...conf
    }).then((response) => {

          if (response.status === 401 || response.status === 403)
            return browserHistory.push('login')
    
          return response.json().then( json => {
              //alert( Promise.reject(json) )
              return response.ok ? json : Promise.reject(json)
          })
    })
}
