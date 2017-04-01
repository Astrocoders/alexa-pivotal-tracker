const pluralize = require('pluralize')

module.exports = function getNotificationsCountCard(count){
  return {
    type: 'Simple',
    title: 'Pivotal Tracker',
    content: count > 0 ?
      `You have ${count} new ${pluralize('notification', count)}` :
      `You don't have any new notifications. Well done!`,
  }
}
