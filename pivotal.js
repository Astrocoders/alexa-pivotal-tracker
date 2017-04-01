const fetch = require('node-fetch')

const endpoint = 'https://www.pivotaltracker.com/services/v5/my/notifications?envelope=true'
const api = {
  getNotifications({ token }){
    return fetch(endpoint, {
      headers: {
        'X-TrackerToken': token,
      },
    }).then(response => response.json())
  }
}

module.exports = api
