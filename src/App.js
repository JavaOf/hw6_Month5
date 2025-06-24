import Register from "./ui/register/Register";
import { useForm } from "react-hook-form";
import schema from "./ui/register/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import "./card.scss";

function App() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    axios
      .post("http://localhost:5000/user", data)
      .then(() => {
        console.log("Успешно добавлено");
        getUsers();
        reset();
      })
      .catch((err) => {
        console.error("Ошибка при отправке данных", err);
      });
  };

  const getUsers = () => {
    axios
      .get("http://localhost:5000/user")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const startEdit = (user) => {
    setEditId(user.id);
    setEditData({
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  };

  const saveEdit = () => {
    axios
      .patch(`http://localhost:5000/user/${editId}`, editData)
      .then(() => {
        setEditId(null);
        setEditData({ username: "", email: "", phone: "" });
        getUsers();
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/user/${id}`)
      .then(() => {
        getUsers();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Register
        errors={errors}
        register={register}
        submitForm={submitForm}
        handleSubmit={handleSubmit}
      />
      <div className="row-card">
        {users.map((item) => (
          <div className="card" key={item.id}>
            {editId === item.id ? (
              <div className="row">
                <div className="card-item">
                  <b className="card-id">ID: {item.id}</b>
                  <input
                    type="text"
                    {...register("username")}
                    value={editData.username}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                    placeholder="Имя"
                  />
                  {errors.username && <p>{errors.username.message}</p>}

                  <input
                    type="email"
                    value={editData.email}
                    {...register("email")}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    placeholder="Почта"
                  />
                  {errors.username && <p>{errors.email.message}</p>}

                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    placeholder="Номер"
                  />
                </div>

                <div>
                  <button onClick={saveEdit} className="card-save">
                    Сохранить
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-item">
                <b className="card-id">ID: {item.id}</b>
                <h3 className="card-username">Имя: {item.username}</h3>
                <span className="card-email">Почта: {item.email}</span>
                <span className="card-email">Номер: {item.phone}</span>
                <button onClick={() => startEdit(item)} className="card-change">
                  Редактировать
                </button>
                <button onClick={() => deleteUser(item.id)} className="card-change">
                  Уничтожить
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
