import PickupBottomnav from "../components/PickupBottomnav";

function Pickuporders() {
  return (
    <div className="pickup-orders-page">
      <PickupBottomnav />

      <div className="pickup-orders-container">
        <div className="pickup-orders-header">
          <div>
            <span>КАБИНЕТ ПУНКТА ПЕРЕДАЧИ</span>
            <h1>Заказы</h1>
            <p>Заказы, которые необходимо принять в вашем пункте передачи</p>
          </div>

          <div className="pickup-orders-count">
            <i className="fa-solid fa-box"></i>
            <div>
              <strong>3</strong>
              <span>Новых заказа</span>
            </div>
          </div>
        </div>

        <div className="pickup-orders-list">
          <div className="pickup-order-card">
            <div className="pickup-order-top">
              <div className="pickup-order-store">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200"
                  alt="Магазин"
                />

                <div>
                  <span>МАГАЗИН</span>
                  <h3>Fashion Store</h3>
                </div>
              </div>

              <span className="pickup-order-status">Ожидает получения</span>
            </div>

            <div className="pickup-order-products">
              <div>
                <i className="fa-solid fa-box"></i>
                <span>Количество товаров</span>
                <strong>5 продуктов</strong>
              </div>

              <div>
                <i className="fa-solid fa-weight-hanging"></i>
                <span>Общий вес</span>
                <strong>3.5 кг</strong>
              </div>
            </div>

            <div className="pickup-order-divider"></div>

            <div className="pickup-order-info-title">
              <i className="fa-solid fa-user"></i>
              Информация о покупателе
            </div>

            <div className="pickup-order-info">
              <div>
                <span>Имя покупателя</span>
                <strong>Александр Иванов</strong>
              </div>

              <div>
                <span>Номер телефона</span>
                <strong>+996 700 123 456</strong>
              </div>

              <div className="pickup-order-full">
                <span>Адрес покупателя</span>
                <strong>г. Бишкек, ул. Манаса, 25</strong>
              </div>
            </div>

            <button className="pickup-order-button">
              <i className="fa-solid fa-box-open"></i>
              Получить заказ
            </button>
          </div>

          <div className="pickup-order-card">
            <div className="pickup-order-top">
              <div className="pickup-order-store">
                <img
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=200"
                  alt="Магазин"
                />

                <div>
                  <span>МАГАЗИН</span>
                  <h3>Style Market</h3>
                </div>
              </div>

              <span className="pickup-order-status">Ожидает получения</span>
            </div>

            <div className="pickup-order-products">
              <div>
                <i className="fa-solid fa-box"></i>
                <span>Количество товаров</span>
                <strong>2 продукта</strong>
              </div>

              <div>
                <i className="fa-solid fa-weight-hanging"></i>
                <span>Общий вес</span>
                <strong>1.8 кг</strong>
              </div>
            </div>

            <div className="pickup-order-divider"></div>

            <div className="pickup-order-info-title">
              <i className="fa-solid fa-user"></i>
              Информация о покупателе
            </div>

            <div className="pickup-order-info">
              <div>
                <span>Имя покупателя</span>
                <strong>Мария Петрова</strong>
              </div>

              <div>
                <span>Номер телефона</span>
                <strong>+996 555 222 111</strong>
              </div>

              <div className="pickup-order-full">
                <span>Адрес покупателя</span>
                <strong>г. Бишкек, ул. Киевская, 100</strong>
              </div>
            </div>

            <button className="pickup-order-button">
              <i className="fa-solid fa-box-open"></i>
              Получить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pickuporders;
