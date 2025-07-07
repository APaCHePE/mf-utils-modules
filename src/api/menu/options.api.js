import http from '../config/http-client';

export const getUserOptions = async (userId, token) => {
  // console.log(`Fetching user options for userId: ${userId}, token: ${token}` );

  const response = await http.get(`https://gateway8079.emapasalas.net.pe/options?idUsuario=${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};