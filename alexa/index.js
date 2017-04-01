const alexaApp = require('./app')
const pivotal = require('../pivotal') 
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
    return pivotal.getNotifications({
      token: accessToken,
    }).then(notifications => {
      response.card(getNotificationsCountCard(notifications.length))
      response.say(`You have ${notifications.length} new notifications`)
    })
  }
}

module.exports = alexaApp
