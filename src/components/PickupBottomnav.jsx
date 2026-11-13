import { NavLink } from "react-router-dom";

function PickupBottomnav() {
  return (
    <div className="seller-bottom-nav">
      <NavLink to="/pickuppoint" className="seller-bottom-nav-item">
        <i className="fa-solid fa-house"></i>
        <span>Главная</span>
      </NavLink>

      <NavLink to="/pickuporders" className="seller-bottom-nav-item">
        <i className="fa-solid fa-box"></i>
        <span>Заказы</span>
      </NavLink>

      <NavLink to="/profile" className="seller-bottom-nav-item">
        <i className="fa-solid fa-user"></i>
        <span>Профиль</span>
      </NavLink>
    </div>
  );
}

export default PickupBottomnav;
