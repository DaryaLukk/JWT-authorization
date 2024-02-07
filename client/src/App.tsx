import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import LoginForm from './components/LoginForm';
import { Context } from '.';
import { IUser } from './models/AuthResponse';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return (
      <div>Загрузка...</div>
    );
  }

  if (!store.isAuth) {
    return (
      <LoginForm />
    );
  }

  return (
    <div className="App">
      <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map((user) => <div key={user.email}>{user.email}</div>)}
    </div>
  );
}

export default observer(App);
