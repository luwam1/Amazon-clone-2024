import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { useContext } from "react";
import { auth } from "../../Utility/Firebase";

function Header() {
  //  const [state,dispatch]=useContext(DataContext)

  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  // console.log(basket.length)

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* Logo and Delivery Info */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                alt="amazon logo"
              />
            </Link>

            <div className={classes.delivery}>
              <SlLocationPin />
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className={classes.search}>
            <select>
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={35} />
          </div>

          {/* Right Side Links */}
          <div className={classes.order__container}>
            {/* Language */}
            <div className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041"
                alt="US flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </div>

            {/* Sign In */}
            <Link to={!user && "/auth"} className={classes.account}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]} </p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p> Hello, Sign In </p>
                    <span> Account & Lists</span>
                  </>
                )}
              </div>
              {/* <div></div> */}
            </Link>

            {/* Returns & Orders */}
            <Link to="/order" className={classes.orders}>
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
