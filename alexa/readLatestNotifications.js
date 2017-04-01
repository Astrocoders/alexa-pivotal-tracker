const alexaApp = require('./app')
const moment = require('moment')
const { take } = require('lodash/fp')
const pivotal = require('../pivotal')
const getNotificationsCountCard = require('./utils/getNotificationsCountCard')
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

  if(!accessToken){
    response.say('You need to link Pivotal Tracker first')
    response.linkAccount()
    return
  }

  return pivotal.getUnreadNotifications({
    token: accessToken,
  }).then(notifications => {
    response.card(getNotificationsCountCard(notifications.length))

    if(notifications.length === 0){
      response.say('You don\'t have any new notifications for now')
    } else {
      const lastNotifications = take(request.slot('COUNT') || 1, notifications)
      lastNotifications.forEach(notification => {
        response.say(notificationToSayText(notification))
      })
    }
  })
})
