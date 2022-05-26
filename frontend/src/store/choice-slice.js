import { createSlice } from '@reduxjs/toolkit';

const choiceSlice = createSlice({
  name: 'choices',
  initialState: { 
    error:null,
   chosen:{
       album: {
           colorCode:'',
           albumName:''
       },
       photosChosen:[

       ],
       poster:'',
       cover:'',
       coverText:''
   }
     
},
  reducers: {
    addPhotoToPhotos(state,action) {
        const newPhoto = action.payload;
        const existingPhoto = state.chosen.photosChosen.find(photo => photo.id === newPhoto.id);
        if(!existingPhoto) {
            state.chosen.photosChosen.push({
                id:newPhoto.id,
                photo:newPhoto.photo,
            })
            state.error = null;
        } else {
            state.error ='Aynı fotoğraf seçilemez!'
        }
    } ,

    removePhotoFromPhotos(state,action) {
        const id = action.payload;
        state.chosen.photosChosen = state.chosen.photosChosen.filter(photo => photo.id !==id)
        state.error = null;
    },

    removePhotos(state) {
       
        state.chosen.photosChosen = []
        state.error = null;
    },

    addAlbumCoices(state,action) {
        state.chosen.album.colorCode = action.payload.colorCode;
        state.chosen.album.albumName = action.payload.albumName;
        state.chosen.poster = action.payload.poster;
        state.chosen.cover = action.payload.cover;
        state.chosen.coverText = action.payload.coverText;
    },

    deleteChoices(state) {
        state.chosen.album.colorCode = ''
        state.chosen.album.albumName = ''
        state.chosen.poster = ''
        state.chosen.cover = ''
        state.chosen.coverText = ''
    },
    getChosen(state,action) {
        state.chosen = action.payload;
    },
    getPhotos(state,action) {
        state.chosen.photosChosen = action.payload;
    }

   




  }
});

export const choiceActions = choiceSlice.actions;

export default choiceSlice;