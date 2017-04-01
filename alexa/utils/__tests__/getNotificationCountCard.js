const getNotificationsCountCard = require('../getNotificationsCountCard')

test('it should handle count when it is 0 properly', () => {
  const cardDef = getNotificationsCountCard(0)

  expect(cardDef).toMatchSnapshot()
})

test('it should handle count when it is 1 properly', () => {
  const cardDef = getNotificationsCountCard(1)

  expect(cardDef).toMatchSnapshot()
})

test('it should handle count when it is more than 1 properly', () => {
  const cardDef = getNotificationsCountCard(10)

  expect(cardDef).toMatchSnapshot()
})
