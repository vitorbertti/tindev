import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './styles.css';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import dislike from '../../assets/dislike.svg';
import like from '../../assets/like.svg';
import itsamatch from '../../assets/itsamatch.png';

export default function Main() {
   const [users, setUsers] = useState([]);
   const [matchDev, setMatchDev] = useState(null);
   let { devId } = useParams();

   useEffect(() => {
      async function loadUsers() {
         const response = await api.get('/devs', {
            headers: {
               user: devId,
            },
         });

         setUsers(response.data);
      }

      loadUsers();
   }, [devId]);

   useEffect(() => {
      const socket = io(process.env.REACT_APP_SERVER_URL, {
         query: { user: devId },
      });

      socket.on('match', (dev) => {
         setMatchDev(dev);
      });
   }, [devId]);

   async function handleLike(id) {
      await api.post(`/devs/${id}/likes`, null, {
         headers: { user: devId },
      });

      setUsers(users.filter((user) => user._id !== id));
   }

   async function handleDislike(id) {
      await api.post(`/devs/${id}/dislikes`, null, {
         headers: { user: devId },
      });

      setUsers(users.filter((user) => user._id !== id));
   }

   return (
      <div className="main-container">
         <Link to="/">
            <img src={logo} alt="Tindev" />
         </Link>

         {users.length > 0 ? (
            <ul>
               {users.map((user) => (
                  <li key={user._id}>
                     <img src={user.avatar} alt={user.name} />
                     <footer>
                        <strong>{user.name}</strong> <span>{user.user}</span>
                        <p>{user.bio}</p>
                     </footer>

                     <div className="buttons">
                        <button
                           type="button"
                           onClick={() => handleDislike(user._id)}
                        >
                           <img src={dislike} alt="Dislike" />
                        </button>
                        <button
                           type="button"
                           onClick={() => handleLike(user._id)}
                        >
                           <img src={like} alt="Like" />
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         ) : (
            <div className="empty">Ended :(</div>
         )}

         {matchDev && (
            <div className="match-container">
               <img src={itsamatch} alt="It's a match" />

               <img className="avatar" src={matchDev.avatar} alt="" />
               <strong>{matchDev.name}</strong>
               <p>{matchDev.bio}</p>

               <button type="button" onClick={() => setMatchDev(null)}>
                  CLOSE
               </button>
            </div>
         )}
      </div>
   );
}
