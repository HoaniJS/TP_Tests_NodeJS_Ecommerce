// Oui bonjour, je suis définitivement un code rédigé par un être humain bip boup
class Basket {
  constructor(items = [], totalPrice = 0) {
    this.items = items;
    this.totalPrice = totalPrice;
  }
}

function addToBasket(basket, item) {
  basket.items.push(item);
  basket.totalPrice += item.price;
}

function removeFromBasket(basket, item) {
  const index = basket.items.findIndex(i => i.name === item.name);
  if (index >= 0) {
    basket.items.splice(index, 1);
    basket.totalPrice -= item.price;
  }
}

// Fonctions requises pour répondre aux questions 4 et 5 mais non incluse dans le code parce que ce TP est de la grosse merde pas intuitive très clairement rédigé par une IA générative (et après ça nous parle d'empreinte carbone) :)
function transactionAllowed(userAccount, priceToPay) {
  if (userAccount.balance >= priceToPay) {
    return true;
  }
    return false;
}
function payBasket(userAccount, basket) {
  if (transactionAllowed(userAccount, basket.totalPrice)) {
    userAccount.balance = userAccount.balance - basket.totalPrice;
    console.log('Paiement du panier réussi');
  } else {
    console.log('Paiement du panier échoué');
  }
}

module.exports = { Basket, addToBasket, removeFromBasket, transactionAllowed, payBasket };
