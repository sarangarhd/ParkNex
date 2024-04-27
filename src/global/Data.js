import React from 'react'
import { Image } from 'react-native-animatable';

export const filterData = [
    {name:'repair',Image:require('../assets/service.png'),id:"0"},
    {name:'filling',Image:require('../assets/shed.png'),id:"1"},
    {name:'atm',Image:require('../assets/atm.jpg'),id:"2"},
    {name:'food',Image:require('../assets/food.jpg'),id:"3"},
    {name:'hospital',Image:require('../assets/hospital.png'),id:"4"},
    {name:'truck',Image:require('../assets/truck.png'),id:"5"},
];

export const parkingData = [
    {
        ParkName: 'Park1',
        ParkAddress: 'No:27,Colombo-01',
        // ParkImage: require(''),
        images:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_aeuegLgpPUhpc5Bh0G0MlPlxJ6Mta--7iQ&usqp=CAU',
        ParkRating: 4,
        ParkDistance: 2,
        ParkPrice: 100,
        ParkId: '0',
        averageReview: 4,
        totalReviews: 100,
        farAway: 2,
        NumberOfSpaces: 10,
        cordinates: {
            lat: 6.9271,
            log: 79.8612,
        },
        discount: 20,
        parkFacilities: [
        {name: 'EV Charging ',image:'https://zdwl-tec.com/wp-content/uploads/2023/09/0053-EV-Charging-Network-Construction-1-jpg.webp'}],
        id: '0',
    
    },
];