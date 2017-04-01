const alexaApp = require('./app')
const moment = require('moment')
const { take } = require('lodash/fp')
const pivotal = require('../pivotal')
const notificationToSayText = require('./utils/notificationToSayText')

alexaApp.intent('ReadLatestNotifications', {
  slots: {
    COUNT: 'AMAZON.NUMBER',
  },
  utterances: [
    'read {the|my} {-|COUNT} last {notifications|notification}',
    'read {the|my} {-|COUNT} last Pivotal Tracker {notifications|notification}',
  ],
}, (request, response) => {
  const accessToken = request.sessionDetails.accessToken

  return pivotal.getNotifications({
    token: accessToken,
  }).then(notifications => {
    const unreadOnes = notifications.data.filter(notification => !notification.read_at)

    if(unreadOnes.length === 0){
      response.say('You don\'t have any new notifications for now')
    } else {
      const lastNotifications = take(request.slot('COUNT') || 1, unreadOnes)
      lastNotifications.forEach(notification => {
        response.say(notificationToSayText(notification))
      })
    }
  })
})
