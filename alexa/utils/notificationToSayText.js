const { lowerFirst } = require('lodash/fp')
const moment = require('moment')

module.exports = function notificationToSayText(notification){
  const fromNow = moment(notification.created_at).fromNow()
  const storyDescription = notification.story.name
    .replace(/^(\[logic\])/gi, 'logic of')
    .replace(/^(\[layout\])/g, 'logic of')
    .replace(/^(\[layout\/logic\])/g, 'logic and layout of')
    .replace(/^(\[logic\/layout\])/g, 'logic and layout of')

  if(notification.notification_type === 'comment'){
    return `${fromNow}, ${notification.performer.name} added a comment to the story "${storyDescription}" in the project ${notification.project.name} saying: ${notification.context}`
  }
  
  return `${fromNow}, ${notification.message}: ${lowerFirst(storyDescription)}. In the project ${notification.project.name}`
}
