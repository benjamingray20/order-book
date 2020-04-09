
const reconcileOrder = (existingBook, incomingOrder) => {
  let updatedBook = []
  if (existingBook.length === 0 ||
    existingBook[0].type === incomingOrder.type ||
    existingBook[0].quantity != incomingOrder.quantity && existingBook[0].price != incomingOrder.price) {
    updatedBook = existingBook.concat(incomingOrder)
    return updatedBook
  }
  if (existingBook[0].quantity === incomingOrder.quantity) {
    updatedBook = existingBook.filter(order => order.type != 'buy')
    return updatedBook
  }
  if (existingBook[0].quantity > incomingOrder.quantity) {
    existingBook[0].quantity = existingBook[0].quantity - incomingOrder.quantity
    updatedBook = existingBook.reverse()
    return updatedBook
  }
  if (existingBook[0].quantity < incomingOrder.quantity && existingBook.length < 3) {
    existingBook[0].quantity = incomingOrder.quantity - existingBook[0].quantity
    existingBook[0].type = 'sell'
    updatedBook = existingBook.reverse()
    return updatedBook
  }
  if (existingBook[0].quantity + existingBook[1].quantity === incomingOrder.quantity) {
    updatedBook = existingBook.filter(order => order.type != 'buy')
    return updatedBook
  }
  if (existingBook[0].quantity + existingBook[1].quantity > incomingOrder.quantity && existingBook[1].type != incomingOrder.type) {
    updatedBook = existingBook.filter(order => order.type != 'buy')
    incomingOrder.quantity = incomingOrder.quantity - existingBook[0].quantity
    incomingOrder.type = 'buy'
    updatedBook = updatedBook.concat(incomingOrder)
    return updatedBook
  }
  else {
    updatedBook = existingBook.filter(order => order.type != 'buy')
    incomingOrder.quantity = incomingOrder.quantity - existingBook[0].quantity - existingBook[1].quantity
    updatedBook = updatedBook.concat(incomingOrder)
    return updatedBook
  }
}
module.exports = reconcileOrder