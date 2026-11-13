import { useState } from "react";
import { Link } from "react-router-dom";
import PickupBottomnav from "../components/PickupBottomnav";

function Pickuppoint() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Ожидают получения");

  const orders = [
    {
      id: "MG-1025",
      status: "Ожидают получения",
      store: "Fashion Store",
      storeAvatar:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
      buyer: "Александр Иванов",
      phone: "+996 700 123 456",
      address: "г. Бишкек, ул. Манаса, 25",
      products: 5,
      weight: 3.5,
      date: "13.11.2026",
    },
    {
      id: "MG-1026",
      status: "Ожидают получения",
      store: "Style Market",
      storeAvatar:
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=200",
      buyer: "Мария Петрова",
      phone: "+996 555 222 111",
      address: "г. Бишкек, ул. Киевская, 100",
      products: 2,
      weight: 1.8,
      date: "13.11.2026",
    },
    {
      id: "MG-1027",
      status: "Завершено",
      store: "Clothes House",
      storeAvatar:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200",
      buyer: "Дмитрий Сидоров",
      phone: "+996 777 111 222",
      address: "г. Бишкек, ул. Ахунбаева, 15",
      products: 4,
      weight: 2.4,
      date: "12.11.2026",
    },
    {
      id: "MG-1028",
      status: "Завершено",
      store: "Fashion Store",
      storeAvatar:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200",
      buyer: "Елена Смирнова",
      phone: "+996 555 333 444",
      address: "г. Бишкек, ул. Московская, 50",
      products: 3,
      weight: 2.1,
      date: "11.11.2026",
    },
  ];

  const filteredOrders = orders.filter((item) => {
    const matchesSearch = item.id.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = item.status === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pickup-home-page">
      <PickupBottomnav />

      <div className="pickup-home-container">
        <div className="pickup-home-header">
          <div>
            <span>КАБИНЕТ ПУНКТА ПЕРЕДАЧИ</span>
            <h1>Главная</h1>
            <p>Управление заказами вашего пункта передачи</p>
          </div>

          <div className="pickup-home-header-icon">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
        </div>

        <div className="pickup-home-stats">
          <div className="pickup-home-stat-card">
            <div className="pickup-home-stat-icon orange">
              <i className="fa-solid fa-box"></i>
            </div>
            <div>
              <span>Ожидают получения</span>
              <h2>2</h2>
            </div>
          </div>

          <div className="pickup-home-stat-card">
            <div className="pickup-home-stat-icon green">
              <i className="fa-solid fa-check"></i>
            </div>
            <div>
              <span>Завершено</span>
              <h2>2</h2>
            </div>
          </div>

          <div className="pickup-home-stat-card">
            <div className="pickup-home-stat-icon black">
              <i className="fa-solid fa-boxes-stacked"></i>
            </div>
            <div>
              <span>Всего заказов</span>
              <h2>4</h2>
            </div>
          </div>
        </div>

        <div className="pickup-home-orders-section">
          <div className="pickup-home-orders-heading">
            <div>
              <h2>Все заказы</h2>
              <p>Найти и управлять заказами</p>
            </div>

            <span className="pickup-home-total">
              {filteredOrders.length} заказа
            </span>
          </div>

          <div className="pickup-home-search">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Введите номер заказа, например MG-1025"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="pickup-home-filters">
            <button
              className={category === "Ожидают получения" ? "active" : ""}
              onClick={() => setCategory("Ожидают получения")}
            >
              <i className="fa-solid fa-clock"></i>
              Ожидают получения
            </button>

            <button
              className={category === "Завершено" ? "active" : ""}
              onClick={() => setCategory("Завершено")}
            >
              <i className="fa-solid fa-circle-check"></i>
              Завершено
            </button>
          </div>

          <div className="pickup-home-orders-list">
            {filteredOrders.length === 0 ? (
              <div className="pickup-home-empty">
                <i className="fa-solid fa-box-open"></i>
                <h3>Заказы не найдены</h3>
                <p>Попробуйте изменить номер заказа или фильтр</p>
              </div>
            ) : (
              filteredOrders.map((item) => (
                <div className="pickup-home-order-card" key={item.id}>
                  <div className="pickup-home-order-top">
                    <div className="pickup-home-order-number">
                      <span>НОМЕР ЗАКАЗА</span>
                      <h3>{item.id}</h3>
                    </div>

                    <span
                      className={
                        item.status === "Завершено"
                          ? "pickup-home-order-status completed"
                          : "pickup-home-order-status waiting"
                      }
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="pickup-home-store">
                    <img src={item.storeAvatar} alt="Магазин" />

                    <div>
                      <span>МАГАЗИН</span>
                      <h3>{item.store}</h3>
                    </div>
                  </div>

                  <div className="pickup-home-order-details">
                    <div>
                      <i className="fa-solid fa-box"></i>
                      <span>Товары</span>
                      <strong>{item.products} шт.</strong>
                    </div>

                    <div>
                      <i className="fa-solid fa-weight-hanging"></i>
                      <span>Общий вес</span>
                      <strong>{item.weight} кг</strong>
                    </div>

                    <div>
                      <i className="fa-solid fa-calendar"></i>
                      <span>Дата</span>
                      <strong>{item.date}</strong>
                    </div>
                  </div>

                  <div className="pickup-home-customer">
                    <h4>
                      <i className="fa-solid fa-user"></i>
                      Покупатель
                    </h4>

                    <div className="pickup-home-customer-info">
                      <div>
                        <span>Имя</span>
                        <strong>{item.buyer}</strong>
                      </div>

                      <div>
                        <span>Телефон</span>
                        <strong>{item.phone}</strong>
                      </div>

                      <div className="pickup-home-customer-address">
                        <span>Адрес</span>
                        <strong>{item.address}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pickup-home-order-actions">
                    <Link
                      to={`/pickuporder/${item.id}`}
                      className="pickup-home-details-button"
                    >
                      <i className="fa-solid fa-eye"></i>
                      Подробнее
                    </Link>

                    {item.status === "Ожидают получения" && (
                      <button className="pickup-home-courier-button">
                        <i className="fa-solid fa-truck-fast"></i>
                        Вызвать курьера
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pickuppoint;
