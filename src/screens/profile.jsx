import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PickupBottomnav from "../components/PickupBottomnav";

const USERS_URL = "https://6aedd445a677fe0fc14f8ae2.mockapi.io/users";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const [editingProfile, setEditingProfile] = useState({
    firstname: "",
    lastname: "",
    numberphone: "",
    adres: "",
  });

  const [saving, setSaving] = useState(false);

  const getPickupData = async () => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      navigate("/pickuppointsignin", { replace: true });
      return;
    }

    try {
      const response = await axios.get(USERS_URL);

      const currentUser = response.data.find(
        (item) => String(item.uid) === String(uid),
      );

      if (!currentUser || currentUser.role !== "pickuppoint") {
        localStorage.removeItem("uid");
        navigate("/pickuppointsignin", { replace: true });
        return;
      }

      if (currentUser.status === "Новый") {
        navigate("/pickupinfo", { replace: true });
        return;
      }

      if (currentUser.status === "Ожидание") {
        navigate("/pickupcheck", { replace: true });
        return;
      }

      if (currentUser.status !== "Подтвержденный") {
        navigate("/pickuppointsignin", { replace: true });
        return;
      }

      setUser(currentUser);
    } catch (error) {
      console.error("ОШИБКА ПОЛУЧЕНИЯ ДАННЫХ:", error);
      alert("Не удалось загрузить данные профиля");
    }
  };

  useEffect(() => {
    getPickupData();
  }, []);

  const openProfile = () => {
    if (!user) {
      alert("Данные пункта передачи не найдены");
      return;
    }

    setEditingProfile({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      numberphone: user.numberphone || "",
      adres: user.adres || "",
    });

    setShowProfile(true);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!editingProfile.firstname.trim()) {
      alert("Введите имя");
      return;
    }

    if (!editingProfile.numberphone.trim()) {
      alert("Введите номер телефона");
      return;
    }

    if (!editingProfile.adres.trim()) {
      alert("Введите адрес пункта передачи");
      return;
    }

    try {
      setSaving(true);

      const response = await axios.put(`${USERS_URL}/${user.id}`, {
        ...user,
        firstname: editingProfile.firstname.trim(),
        lastname: editingProfile.lastname.trim(),
        numberphone: editingProfile.numberphone.trim(),
        adres: editingProfile.adres.trim(),
      });

      setUser(response.data);
      setShowProfile(false);

      alert("Данные пункта передачи обновлены!");
    } catch (error) {
      console.error("ОШИБКА ОБНОВЛЕНИЯ ПРОФИЛЯ:", error);
      alert("Не удалось обновить данные");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="seller-profile-page">
      <PickupBottomnav />

      <div className="seller-profile-container">
        <div className="seller-profile-header">
          <div>
            <span>КАБИНЕТ ПУНКТА ПЕРЕДАЧИ</span>
            <h1>Мой профиль</h1>
            <p>Управляйте информацией своего пункта передачи</p>
          </div>

          <div className="seller-profile-avatar">
            <i className="fa-solid fa-box"></i>
          </div>
        </div>

        <div className="seller-profile-card">
          <div className="seller-profile-card-title">
            <div>
              <h2>Информация о пункте</h2>
              <p>Данные вашего аккаунта</p>
            </div>

            <i className="fa-solid fa-user-pen"></i>
          </div>

          <div className="seller-profile-info">
            <div className="seller-profile-info-item">
              <span>Имя</span>
              <h3>{user?.firstname || "Не указано"}</h3>
            </div>

            <div className="seller-profile-info-item">
              <span>Фамилия</span>
              <h3>{user?.lastname || "Не указана"}</h3>
            </div>

            <div className="seller-profile-info-item">
              <span>Номер телефона</span>
              <h3>{user?.numberphone || "Не указан"}</h3>
            </div>

            <div className="seller-profile-info-item">
              <span>Email</span>
              <h3>{user?.email || "Не указан"}</h3>
            </div>

            <div className="seller-profile-info-item seller-profile-full">
              <span>Адрес пункта передачи</span>
              <h3>{user?.adres || "Не указан"}</h3>
            </div>

            <div className="seller-profile-info-item seller-profile-full">
              <span>Баланс</span>
              <h3>{user?.balance || "0"} сом</h3>
            </div>
          </div>
        </div>

        <div className="seller-profile-actions">
          <Link
            to=""
            className="seller-profile-action"
            onClick={(e) => {
              e.preventDefault();
              openProfile();
            }}
          >
            <div className="seller-profile-action-icon">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>

            <div>
              <h3>Мои данные</h3>
              <p>Изменение информации о пункте передачи</p>
            </div>

            <i className="fa-solid fa-chevron-right"></i>
          </Link>

          <button
            className="seller-profile-logout"
            onClick={() => {
              localStorage.removeItem("uid");
              navigate("/");
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Выйти из аккаунта
          </button>
        </div>
      </div>

      {showProfile && (
        <div
          className="seller-business-modal-overlay"
          onClick={() => setShowProfile(false)}
        >
          <form
            className="seller-business-modal"
            onSubmit={updateProfile}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="seller-business-modal-close"
              onClick={() => setShowProfile(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="seller-business-modal-title">
              <div className="seller-business-modal-icon">
                <i className="fa-solid fa-box"></i>
              </div>

              <h2>Мои данные</h2>
              <p>Изменение информации пункта передачи</p>
            </div>

            <label>Имя</label>
            <input
              type="text"
              value={editingProfile.firstname}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  firstname: e.target.value,
                })
              }
              placeholder="Введите имя"
            />

            <label>Фамилия</label>
            <input
              type="text"
              value={editingProfile.lastname}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  lastname: e.target.value,
                })
              }
              placeholder="Введите фамилию"
            />

            <label>Номер телефона</label>
            <input
              type="text"
              value={editingProfile.numberphone}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  numberphone: e.target.value,
                })
              }
              placeholder="Введите номер телефона"
            />

            <label>Адрес пункта передачи</label>
            <input
              type="text"
              value={editingProfile.adres}
              onChange={(e) =>
                setEditingProfile({
                  ...editingProfile,
                  adres: e.target.value,
                })
              }
              placeholder="Введите адрес"
            />

            <button
              type="submit"
              className="seller-business-modal-save"
              disabled={saving}
            >
              <i className="fa-solid fa-check"></i>
              {saving ? "Сохранение..." : "Сохранить изменения"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Profile;
