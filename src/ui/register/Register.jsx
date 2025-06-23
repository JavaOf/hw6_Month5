import './register.scss';

const Register = ({ handleSubmit, register, submitForm, errors }) => {
  return (
    <form onSubmit={handleSubmit(submitForm)} className="register-form">
      <div className="register-form__box">
        <label>Ваше имя:</label>
        <input
          {...register('username')}
          type="text" 
          placeholder="Введите ваше имя"
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div className="register-form__box">
        <label>Ваш email:</label>
        <input
          {...register('email')}
          type="email"
          placeholder="Введите ваш email"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="register-form__box">
        <label>Ваш пароль:</label>
        <input
          {...register('password')}
          type="password"
          placeholder="Введите ваш пароль"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className="register-form__box">
        <label>Ваш номер:</label>
        <input
          {...register('phone')}
          type="tel" 
          placeholder="Введите ваш номер"
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
        <div className="register-form__box">
        <label>Подтверждение пароля:</label>
        <input
          {...register('confirmPassword')}
          type="password" 
          placeholder="Введите ваш номер"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div className="register-form__box">
        <button type="submit">Войти</button>
      </div>
    </form>
  );
};

export default Register;