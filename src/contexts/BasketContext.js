import {
  useState,
  createContext,
  useContext,
  useEffect,
  Children,
} from "react";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];
  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((items) => [data, ...items]);
    }

    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };

  const emptyBasket = () => setItems([]);
  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
