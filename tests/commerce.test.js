const { Basket, addToBasket, removeFromBasket, transactionAllowed, payBasket } = require('../src/ecommerce');

test('ajout d’un produit met à jour le prix total', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  expect(basket.totalPrice).toBe(100);
});

test('suppression d’un produit remet le total à zéro', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  removeFromBasket(basket, item);
  expect(basket.totalPrice).toBe(0);
});

test('ajout et suppression successifs d’un produit', () => {
  const basket = new Basket();
  const item = { name: 'Carte mère', price: 100 };
  addToBasket(basket, item);
  expect(basket.totalPrice).toBe(100);
  removeFromBasket(basket, item);
  expect(basket.totalPrice).toBe(0);
})

test('transaction d’une somme inférieure à la solde d’un utilisateur est autorisée', () => {
  const basket = new Basket();
  const user = {name: 'Perceval', balance: 500};
  expect(transactionAllowed(user, 400)).toBe(true);
})

test('transaction d’une somme supérieure à la solde d’un utilisateur n’est pas autorisée', () => {
  const basket = new Basket();
  const user = {name: 'Perceval', balance: 500};
  expect(transactionAllowed(user, 600)).toBe(false);
})

test('paiement d’un paiement inférieur à la solde d’un utilisateur réussit', () => {
  const basket = new Basket();
  const item = { name: 'Carte graphique', price: 300 };
  const user = { name: 'Perceval', balance: 500 };

  addToBasket(basket, item);
  console.log = jest.fn();
  payBasket(user, basket);

  expect(console.log).toHaveBeenCalledWith('Paiement du panier réussi');
  expect(user.balance).toBe(200);
})

test('paiement d’un paiement supérieur à la solde d’un utilisateur échoue', () => {
  const basket = new Basket();
  const item = { name: 'Carte graphique', price: 300 };
  const user = { name: 'Perceval', balance: 500 };

  addToBasket(basket, item);
  console.log = jest.fn();

  payBasket(user, basket);
  payBasket(user, basket);

  expect(console.log).toHaveBeenCalledWith('Paiement du panier échoué');
  expect(user.balance).toBe(200);
})

// Fonction impossible telle quelle avec les fonctions de test Jest suivant le modèle des 2 premières (fournies dans le .zip) et les console.log de payBasket (fournie dans l'énoncé)

// function testAppEcommerce() {
//   let success = testAdd();
//   success = success && testRemove();
//   success = success && testAddRemove();
//   success = success && testTransactionAllowed();
//   success = success && testPayBasket();
//   if (success) {
//     console.log("OK");
//   } else {
//     console.log("ERREUR");
//   }
// }

// testAppEcommerce();