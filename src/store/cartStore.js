import { atom } from 'nanostores';

export const isCartOpen = atom(false);
export const cartItems = atom([]);

export function toggleCart() {
  isCartOpen.set(!isCartOpen.get());
}

export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}

export function addToCart(item) {
  const currentItems = cartItems.get();
  const existingItemIndex = currentItems.findIndex((i) => String(i.id) === String(item.id));

  if (existingItemIndex > -1) {
    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex] = {
      ...updatedItems[existingItemIndex],
      cantidad: updatedItems[existingItemIndex].cantidad + 1,
    };
    cartItems.set(updatedItems);
  } else {
    cartItems.set([...currentItems, { ...item, cantidad: 1 }]);
  }
  openCart();
}

export function updateQuantity(id, delta) {
  const currentItems = cartItems.get();
  const updatedItems = currentItems
    .map((item) => {
      if (String(item.id) === String(id)) {
        const newQty = item.cantidad + delta;
        return newQty > 0 ? { ...item, cantidad: newQty } : null;
      }
      return item;
    })
    .filter(Boolean);

  cartItems.set(updatedItems);
}

export function removeFromCart(id) {
  const currentItems = cartItems.get();
  cartItems.set(currentItems.filter((item) => String(item.id) !== String(id)));
}

export function clearCart() {
  cartItems.set([]);
}
