import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

//si hay token le agregamos un encabezado de autorización a cada solicitud after
//sino eliminamos esa autoruzación