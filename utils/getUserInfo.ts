// 'use client';
// import { login } from '@/redux/features/authSlice';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';

// interface JWType {
//   userId: string;
//   useravatar: string;
//   username: string;
// }
// interface TokenObject {
//   userId: string;
// }

// const fetchUserInfo = async (token: TokenObject) => {
//   const storeUserInfo = useDispatch();
//   try {
//     const { data } = await axios.get(`/api/getuserinfo?id=${token.userId}`);

//     if (data?.res) {
//       storeUserInfo(login(data?.info));
//     }
//   } catch (error) {}
// };
// export const getUserInfo = async () => {
//   try {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken != null && undefined) {
//       const jwttok: JWType = jwtDecode(storedToken);
//       await fetchUserInfo(jwttok);
//       return true;
//     } else if (storedToken === undefined || null) {
//       console.log('No JWT token found on local storage');
//       return false;
//     }
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };
