const fetch = require('node-fetch')

const endpoint = 'https://www.pivotaltracker.com/services/v5/my/notifications?envelope=true'
const api = {
  getNotifications({ token }){
    return fetch(endpoint, {
      headers: {
        'X-TrackerToken': token,
      },
    }).then(response => response.json())
  },

  getUnreadNotifications({ token }){
    return api.getNotifications({ token })
      .then(({data: notifications}) => notifications.filter(isUnreadNotification))
  },
}

function isUnreadNotification(notification){
  return Boolean(notification.read_at) === false
}

module.exports = api
