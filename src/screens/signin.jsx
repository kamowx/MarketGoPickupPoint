import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase-config";
import axios from "axios";

const USER_URL = "https://6aedd445a677fe0fc14f8ae2.mockapi.io/users";

function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getUserByUid = async (uid) => {
    const response = await axios.get(USER_URL);

    return response.data.find((item) => String(item.uid) === String(uid));
  };

  const createUser = async (userData) => {
    const response = await axios.post(USER_URL, userData);
    return response.data;
  };

  const checkStatus = (user) => {
    if (user.status === "Новый") {
      navigate("/pickupinfo");
    } else if (user.status === "Ожидание") {
      navigate("/pickupcheck");
    } else if (user.status === "Подтвержденный") {
      navigate("/profile");
    } else {
      alert("Неизвестный статус: " + user.status);
    }
  };

  const loginWithGoogle = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      let existingUser = await getUserByUid(googleUser.uid);

      if (!existingUser) {
        const nameParts = (googleUser.displayName || "").split(" ");

        existingUser = await createUser({
          uid: googleUser.uid,
          firstname: nameParts[0] || "",
          lastname: nameParts.slice(1).join(" "),
          email: googleUser.email || "",
          avatar: googleUser.photoURL || "",
          numberphone: googleUser.phoneNumber || "",
          role: "pickuppoint",
          status: "Новый",
          balance: "0",
          adres: "Адреса нет",
          createdAt: new Date().toISOString(),
        });
      }

      if (existingUser.role !== "pickuppoint") {
        alert("Этот аккаунт не является аккаунтом пункта передачи");
        return;
      }

      localStorage.setItem("uid", googleUser.uid);

      checkStatus(existingUser);
    } catch (error) {
      console.error("Ошибка входа через Google:", error);
      alert(
        "Ошибка входа: " +
          (error.code || error.message || "Неизвестная ошибка"),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSavedUser = async () => {
      let uid = localStorage.getItem("uid");

      if (!uid) return;

      try {
        uid = JSON.parse(uid);
      } catch (error) {}

      try {
        const user = await getUserByUid(uid);

        if (user && user.role === "pickuppoint") {
          checkStatus(user);
        }
      } catch (error) {
        console.error("Ошибка проверки пользователя:", error);
      }
    };

    checkSavedUser();
  }, []);

  return (
    <div className="admin-signup-page">
      <div className="admin-signup-left">
        <div className="admin-signup-logo">
          MarketGo<span>.</span>
        </div>

        <div className="admin-signup-left-content">
          <p className="admin-signup-small">ПУНКТ ПЕРЕДАЧИ</p>

          <h1>
            Вход в
            <br />
            аккаунт пункта передачи
          </h1>

          <p className="admin-signup-left-text">
            Войдите или зарегистрируйте аккаунт пункта передачи, чтобы принимать
            и передавать заказы MarketGo.
          </p>
        </div>

        <div className="admin-signup-left-bottom">MarketGo — ВАШ МАГАЗИН</div>
      </div>

      <div className="admin-signup-right">
        <div className="admin-signup-form-container">
          <p className="admin-signup-form-small">ДОБРО ПОЖАЛОВАТЬ</p>

          <h2>Вход или регистрация</h2>

          <p className="admin-signup-form-description">
            Продолжите через Google
          </p>

          <div className="admin-signup-form">
            <button
              type="button"
              className="admin-signup-button"
              onClick={loginWithGoogle}
              disabled={loading}
            >
              <div className="google-logo" style={{ fontSize: "20px" }}>
                <span className="g-first">G</span>
                <span className="o-first">o</span>
                <span className="o-second">o</span>
                <span className="g-second">g</span>
                <span className="l-letter">l</span>
                <span className="e-letter">e</span>
              </div>

              <span>{loading ? "..." : "→"}</span>
            </button>
          </div>

          <p className="admin-signup-bottom-text">MarketGO</p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
