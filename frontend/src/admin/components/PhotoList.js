import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UserList.css";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../shared/components/Loader";
import { photoActions } from "../../store/photo-slice";
import { getPhotos, deletePhoto, createPhoto } from "../../store/photo-actions";

import AdminNav from "./AdminNav";

const PhotoList = () => {
  const history = useHistory();
  const dispatch = useDispatch();


  const userLogin = useSelector((state) => state.user.userLogin);
  const { userInfo } = userLogin;

  const photoList = useSelector((state) => state.photo);
  const {  isLoading, error, photos } = photoList;
  const [showByProp, setshowByProp] = useState("all");
  const deletedPhoto = useSelector((state) => state.photo.photoDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    
  } = deletedPhoto;

  const filterHandler = (e) => {
    setshowByProp(e.target.value);
  };
  const createdPhoto = useSelector((state) => state.photo.photoCreate);

  const { success: successCreate } = createdPhoto;
  useEffect(() => {
    dispatch(photoActions.photoCreateReset());
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/photo/${createdPhoto.createdPhoto._id}/edit`);
    } else {
      dispatch(getPhotos());
    }
  }, [dispatch, successDelete, successCreate, loadingDelete, createdPhoto.createdPhoto._id,history,userInfo.isAdmin]);

  const deleteHandler = (id) => {
    dispatch(deletePhoto(id));
  };

  const createPhotoHandler = () => {
    dispatch(createPhoto());
    console.log("hi");
  };

  return (
    <div>
      <div className="color"></div>
      <AdminNav />
      <div className="filter-container">
      <button
        className="userlist-new"
        style={{ margin: "0.5rem" }}
        onClick={() => createPhotoHandler()}
      >
        Fotoğraf Ekle
      </button>
      <div>
      <label htmlFor="prop">Fotoğraf Türü</label>
        <select onChange={filterHandler} name="prop" id="prop">
          <option value="all">hepsi</option>
          <option value="home">Ana Sayfa</option>
          <option value="album">Album</option>
          <option value="package">Paket</option>
          <option value="banner">Banner</option>
          
        </select>
      </div>
      </div>

      {isLoading ?  <Loader /> : 
      <div className="table-container">
        <table className="fl-table">
          <thead>
            <tr>
              <th>PROPERTY</th>
              <th>DESCRIPTION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
         
            {!error && 
              photos && (showByProp === 'all' ?photos.map((photo, index) => {
                return (
                  (
                    <tr key={photo._id}>
                      <td>{photo.property}</td>
                      <td>{index + 1}</td>
                      <td>{photo.image}</td>

                      <td>
                        <Link to={`/admin/photo/${photo._id}/edit`}>
                          <button>
                            <i
                              className="fas fa-edit"
                              style={{ color: "green" }}
                            ></i>
                          </button>
                        </Link>
                        <button onClick={() => deleteHandler(photo._id)}>
                          <i
                            className="fas fa-trash"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  )
                );
              }) : 
              photos.filter(photo => photo.property === showByProp).map((photo, index) => {
                return (
                  (
                    <tr key={photo._id}>
                      <td>{photo.property}</td>
                      <td>{index + 1}</td>
                      <td>{photo.image}</td>


                      <td>
                        <Link to={`/admin/photo/${photo._id}/edit`}>
                          <button>
                            <i
                              className="fas fa-edit"
                              style={{ color: "green" }}
                            ></i>
                          </button>
                        </Link>
                        <button onClick={() => deleteHandler(photo._id)}>
                          <i
                            className="fas fa-trash"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  )
                );
              }) ) 
              }
          </tbody>
        </table>
      </div>
    }
    </div>
  );
};

export default PhotoList;
