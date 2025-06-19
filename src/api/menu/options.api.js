import http from '../config/http-client';

export const getUserOptions = async (userId, token) => {
  console.log(`Fetching user options for userId: ${userId}, token: ${token}` );
  
  const response = await http.get(`http://localhost:3001/api/users/options?idUsuario=${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};