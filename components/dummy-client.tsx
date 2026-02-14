"use client";

import { Cart, CartItem } from "@/app/utils/test";
import { useRef, useState } from "react";

type Props = object;

export default function DummyClient({}: Props) {
  const [items, setItems] = useState<CartItem[]>([
    { item: "Apple", quantity: 3, price: 50 },
    { item: "Banana", quantity: 6, price: 10 },
    { item: "Milk", quantity: 1, price: 60 },
    { item: "Laptop", quantity: 1, price: 65000 },
    { item: "Mouse", quantity: 1, price: 799 },
    { item: "Keyboard", quantity: 1, price: 1499 },
    { item: "USB Cable", quantity: 2, price: 299 },

    { item: "Coffee Beans 250g", quantity: 2, price: 450 },
    { item: "French Press", quantity: 1, price: 1499 },
    { item: "Milk", quantity: 2, price: 60 },
    { item: "Sugar", quantity: 1, price: 45 },

    { item: "Notebook", quantity: 5, price: 80 },
    { item: "Pen", quantity: 10, price: 20 },
    { item: "Backpack", quantity: 1, price: 1299 },
    { item: "T-Shirt", quantity: 2, price: 799 },
    { item: "Jeans", quantity: 1, price: 1999 },
    { item: "Socks", quantity: 3, price: 149 },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const cart = new Cart(items);

  function handleAddItem() {
    if (!inputRef.current) return;
    setItems((prevState) => [
      ...prevState,
      {
        item: inputRef.current?.value || "Hello",
        price: 400,
        quantity: 20,
      },
    ]);
    inputRef.current.value = "";
  }

  return (
    <section>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item.item}</li>
        ))}
      </ul>
      <p>
        Total Price:<span>{cart.subTotal}</span>
      </p>
      <div className="flex flex-col gap-2">
        <label>Item</label>
        <input ref={inputRef} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </section>
  );
}
