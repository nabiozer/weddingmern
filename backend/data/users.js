
import bcrypt from 'bcryptjs';
const users =
[
{
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true,

},

{
    name: 'U1',
    email: 'u1@example.com',
    password: bcrypt.hashSync('123456',10),
    deliveryInfo: {
        adress:'abdülbaki golpınarlı u21 ',
        phoneNumber:'5303180728'
    },
    reservationInfo: {
        date:'02.04.2022',
        hour:'12:00',
        place:'plato',
        packagePrice:1500,
        advancePayment:300,
        packageDetails:'fotoğraf çekimi ve video klip (1dk)'

    },

    chosen:{
        album:{
            colorCode:'404',
            albumName:'more'
        },
        photosChosen:[
            'IMG-0738.JPG',
            'IMG-0739.JPG'
        ],
        poster:'IMG-0738.JPG',
        cover:'IMG-0738.JPG'

    },
    photos:'',
    video:'',
    albumDelivered:false,
    photoProcessed:false,
    isAdmin: false,

},
{
    name: 'U2',
    email: 'u2@example.com',
    password: bcrypt.hashSync('123456',10),
    deliveryInfo: {
        adress:'abdülbaki golpınarlı u1 ',
        phoneNumber:'5303180728'
    },
    reservationInfo: {
        date:'03.04.2022',
        hour:'13:00',
        place:'plato2',
        packagePrice:1700,
        advancePayment:300,
        packageDetails:'fotoğraf çekimi ve video klip (1dk)'

    },

    chosen:{
        album:{
            colorCode:'402',
            albumName:'DORA'
        },
        photos:[
            'IMG-0738.JPG',
            'IMG-0739.JPG',
        ],
        poster:'IMG-0738.JPG',
        cover:'IMG-0738.JPG',
        coverText:'xx&xx 2013'

    },
    photos:'',
    video:'',
    albumDelivered:false,
    photoProcessed:false,
    isAdmin: false,

}
]

export default users;







