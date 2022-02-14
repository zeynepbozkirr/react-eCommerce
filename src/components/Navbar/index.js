import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  console.log(loggedIn, "loggedın");

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className="logo">
            <Link to="/"> eCommerce </Link>
          </div>
          <ul className={styles.menu}>
            <li>
              <Link to="/">Product</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          {!loggedIn && (
            <>
              <Link to="/signin">
                <Button colorScheme="pink">Login</Button>
              </Link>
              <Link to="/signup">
                <Button colorScheme="pink">Register</Button>
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin">
              <Button colorScheme="pink" variant="ghost">
                Admin
              </Button>
            </Link>
          )}
          {loggedIn && (
            <>
              {items.length > 0 && (
                <Link to="basket">
                  <Button colorScheme="pink"> Basket {items.length}</Button>
                </Link>
              )}

              <Link to="/profile">
                <Button>Profile</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
