
const reconcileOrder = (existingBook, incomingOrder) => {
  let updatedBook = []
  let existingOrderBookType = existingBook.map(function (order) { return order.type })
  let existingOrderBookPrice = existingBook.map(function (order) { return order.price })
  let existingOrderBookQuantity = existingBook.map(function (order) { return order.quantity })

  if (existingBook.length == 0) {
    updatedBook = existingBook.concat(incomingOrder)

  } else if ((existingOrderBookType == incomingOrder.type) && (existingBook.type != 'buy')) {
    updatedBook = existingBook.concat(incomingOrder)

  } else if ((existingOrderBookType != incomingOrder.type) && (existingOrderBookPrice != incomingOrder.price)) {

    updatedBook = existingBook.concat(incomingOrder)

  } else if ((existingOrderBookQuantity == incomingOrder.quantity) && (existingOrderBookPrice == incomingOrder.price)) {
    for (let i = 0; i < existingBook.length; i++) {
      if (incomingOrder[i] == existingBook[i]) {
        existingBook.pop(i)
      }
      updatedBook = existingBook
    }
  } else if ((existingOrderBookType != incomingOrder.Type) && (existingOrderBookQuantity > incomingOrder.quantity) && (existingOrderBookPrice == incomingOrder.price)) {
    incomingOrder.quantity = (existingOrderBookQuantity - incomingOrder.quantity)
    incomingOrder.type = ('buy')
    updatedBook = updatedBook.concat(incomingOrder)
  } else if ((existingOrderBookType != incomingOrder.Type) && (existingOrderBookQuantity < incomingOrder.quantity) && (existingOrderBookPrice == incomingOrder.price)) {
    incomingOrder.quantity = (incomingOrder.quantity - existingOrderBookQuantity)
    updatedBook = updatedBook.concat(incomingOrder)

  } return updatedBook
}
module.exports = reconcileOrder