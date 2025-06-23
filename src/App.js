import Register from "./ui/register/Register";
import { useForm } from "react-hook-form";
import schema from "./ui/register/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState({});

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
        console.log("Успешно");
      })
      .catch((err) => {
        console.error("Ошибка при отправке данных", err);
      });
    reset();
  };

  return (
    <div className="App">
      <Register
        errors={errors}
        register={register}
        submitForm={submitForm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
