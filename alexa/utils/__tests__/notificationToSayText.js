const notificationToSayText = require('../notificationToSayText')
const moment = require('moment')

test('should produce the expected say text to delivery notifications', () => {
  const deliveryNotification = {
    kind: 'notification',
    id: 0,
    project: { kind: 'project', id: 0, name: 'Astroman' },
    performer: { kind: 'person', id: 1410034, name: 'Guilherme Decampo' },
    message: 'Guilherme Decampo delivered the story',
    notification_type: 'story',
    action: 'delivery',
    story: { kind: 'story',
       id: 0,
       name: '[Logic] Add coolness'
    },
    created_at: '2017-03-20T14:01:57Z',
    updated_at: '2017-03-20T14:01:57Z'
  }

  const fromNow = moment(deliveryNotification.created_at).fromNow()
  expect(notificationToSayText(deliveryNotification)).toEqual(`${fromNow}, ${deliveryNotification.message}: logic of Add coolness. In the project Astroman`)
})

test('should produce the expected say text to create notifications', () => {
  const deliveryNotification = { kind: 'notification',
    id: 0,
    project: { kind: 'project', id: 0, name: 'X' },
    performer: { kind: 'person', id: 1410034, name: 'Guilherme Decampo' },
    message: 'Guilherme Decampo added the story',
    notification_type: 'story',
    action: 'create',
    story: { kind: 'story', id: 0, name: 'Setup email' },
    created_at: '2017-03-20T14:16:02Z',
    updated_at: '2017-03-20T14:16:02Z' }

  const fromNow = moment(deliveryNotification.created_at).fromNow()
  expect(notificationToSayText(deliveryNotification)).toBe(`${fromNow}, ${deliveryNotification.message}: setup email. In the project X`)
})

test('should produce the expected say text to comment notifications', () => {
  const notification = { kind: 'notification',
    id: 0,
    project: { kind: 'project', id: 0, name: 'Fullmetal Alchemist' },
    performer: { kind: 'person', id: 0, name: 'Joseph Elric' },
    message: 'Joseph Elric added the comment',
    context: 'Hey peeps, there is this thing about turning things into gold there is bad for the economy. What do you think?',
    notification_type: 'comment',
    new_attachment_count: 0,
    action: 'create',
    story: { kind: 'story', id: 0, name: 'Turn things into gold' },
    comment_id: 0,
    created_at: '2017-03-20T18:07:04Z',
    updated_at: '2017-03-20T18:07:04Z' }

  const fromNow = moment(notification.created_at).fromNow()
  expect(notificationToSayText(notification)).toBe(`${fromNow}, Joseph Elric added a comment to the story "Turn things into gold" in the project Fullmetal Alchemist saying: Hey peeps, there is this thing about turning things into gold there is bad for the economy. What do you think?`)
})
