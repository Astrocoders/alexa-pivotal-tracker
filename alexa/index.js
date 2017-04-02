const alexaApp = require('./app')
const pivotal = require('../pivotal') 
const pluralize = require('pluralize')
const getNotificationsCountCard = require('./utils/getNotificationsCountCard')

require('./readLatestNotifications')

alexaApp.launch(sayNotificationsCount)
alexaApp.intent('CheckNotifications', {
  utterances: [
    'what is new',
    'tell me my notifications',
    'do I have any new Pivotal Tracker notifications',
  ],
}, sayNotificationsCount)

alexaApp.error = (exception, request, response) => {
  console.log(exception)
  response.say('I couldn\'t reach Pivotal Tracker, try again later')
}

function sayNotificationsCount(request, response){
  const accessToken = request.sessionDetails.accessToken

  if(!accessToken){
    response.say('You need to link Pivotal Tracker first')
    response.linkAccount()
  } else {
    return pivotal.getUnreadNotifications({
      token: accessToken,
    }).then(notifications => {
      const count = notifications.length
      response.card(getNotificationsCountCard(count))
      response.say(`You have ${count} new ${pluralize('notification', count)}`)
    })
  }
}

module.exports = alexaApp
