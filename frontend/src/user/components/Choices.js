import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Choices.css";

const Choices = () => {
  const userDetails = useSelector((state) => state.user.userDetails);
  const { loading, error, user } = userDetails;
  const history = useHistory();
  

  return (
    <section className="choices-section">
      {user.name && (
        <>
         
          {!user.chosen.album.albumName &&
          !user.chosen.album.colorCode &&
          !user.chosen.poster &&
          !user.chosen.cover &&
          !user.chosen.coverText ? (
            <div>
              <Link to="profile/albumform">Seçim Yap</Link>
            </div>
          ) : (
            <div className="choices-container">
           
            <div className="choices-container__album">
            <h4>Albüm Seçimleri</h4>
              <div className="choices-container__album__item">
                <p>
                  Albüm: <span>{user.chosen.album.albumName} - {user.chosen.album.colorCode}</span>
                </p>
              </div>
              <div className="choices-container__album__item">
              
                <p> Ebatlar : <span>25x65-2 Jumbo Cep-50x70 Poster</span></p>
              </div>
              <div className="choices-container__album__item">
                
                <p>Kapak Yazısı : <span>{user.chosen.coverText} </span></p>
              </div>

              <div className="choices-container__album__item">
                
                <p> Kapak Fotoğrafı : <span>{user.chosen.cover}</span></p>
              </div>
              <div className="choices-container__album__item">
                
                <p>Poster Fotoğrafı : <span>{user.chosen.poster}</span></p>
              </div>

              <div className="choices-container__album__item">
                
                <p>Albüm Durumu : <span>{user.albumDelivered}</span></p>
              </div>
            </div>
            <div className="choices-container__photos">
              <h4>Seçilen Fotoğraflar</h4>

              <ul className="choices-container__photos__list">
                {user.chosen.photosChosen.map(item => item.photo).sort((a,b) => a-b).map((item,index) =>  {
                  return (<li key={index}>{index + 1}: {item} </li>)
                }
                 
                 )}
              </ul>

              <p>Fotoğraf Durumu : <span>{user.photoProcessed}</span></p>
            </div>

           
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Choices;
