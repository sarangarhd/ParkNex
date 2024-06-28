import React from 'react';
import {Image} from 'react-native-animatable';
import {Rating} from 'react-native-elements';
import { title } from './Styles';

export const filterData = [
  {name: 'repair', Image: require('../assets/service.png'), id: '0'},
  {name: 'filling', Image: require('../assets/shed.png'), id: '1'},
  {name: 'atm', Image: require('../assets/atm.jpg'), id: '2'},
  {name: 'food', Image: require('../assets/food.jpg'), id: '3'},
  {name: 'hospital', Image: require('../assets/hospital.png'), id: '4'},
  {name: 'truck', Image: require('../assets/truck.png'), id: '5'},
];

export const parkingData = [
  {
    ParkName: 'Park1',
    ParkAddress: 'No:27,Colombo-01',
    // ParkImage: require(''),
    images:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_aeuegLgpPUhpc5Bh0G0MlPlxJ6Mta--7iQ&usqp=CAU',
    ParkRating: 4,
    Rating: 4,
    farAway: 2,
    ParkPrice: 100,
    ParkId: '0',
    averageReview: 4,
    NumberOfReviews: 100,
    farAway: 2,
    NumberOfSpaces: 100,
    cordinates: {
      lat: 6.9271,
      log: 79.8612,
    },
    discount: 20,
    parkFacilities: [
      {
        name: 'EV Charging ',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PGtjq9Rso6JaQbk6rFNhv6xgYMsDuHHaNA&s',
      },
      {
        name: 'Washrooms',
        image:
          'https://us.123rf.com/450wm/moleks/moleks1510/moleks151000761/47460950-man-woman-restroom-sign-icon-vector-button-symbol-concept.jpg?ver=6',
      },
      {
        name: 'Play Area ',
        image:
          'https://media1.thehungryjpeg.com/thumbs/800_3999234_1kfchw9fwzszfaoqvesh689wdvj1sz8607f6pm0d.jpg',
      },
    ],
    id: '0',
    AvailableSlots: 10,
  },
  {
    ParkName: 'Park2',
    ParkAddress: 'No:27,Colombo-01',
    // ParkImage: require(''),
    images:
      'https://www.parkingdetection.com/wp-content/uploads/2019/02/pozadi-nahled.png',
    ParkRating: 4,
    Rating: 4,
    farAway: 2,
    ParkPrice: 100,
    ParkId: '0',
    averageReview: 4,
    NumberOfReviews: 100,
    farAway: 2,
    NumberOfSpaces: 10,
    cordinates: {
      lat: 6.9271,
      log: 79.8612,
    },
    discount: 20,
    parkFacilities: [
      {
        name: 'EV Charging ',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PGtjq9Rso6JaQbk6rFNhv6xgYMsDuHHaNA&s',
      },
      {
        name: 'Washrooms',
        image:
          'https://us.123rf.com/450wm/moleks/moleks1510/moleks151000761/47460950-man-woman-restroom-sign-icon-vector-button-symbol-concept.jpg?ver=6',
      },
      {
        name: 'Play Area ',
        image:
          'https://media1.thehungryjpeg.com/thumbs/800_3999234_1kfchw9fwzszfaoqvesh689wdvj1sz8607f6pm0d.jpg',
      },
    ],
    id: '1',
    AvailableSlots: 10,
  },
  {
    ParkName: 'Park3',
    ParkAddress: 'No:27,Colombo-01',
    // ParkImage: require(''),
    images:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXJXUuarSwB2r4yX9ekVvp7nUp5-A044MBvEBxUs4BIQ&s',
    ParkRating: 4,
    Rating: 4,
    farAway: 2,
    ParkPrice: 100,
    ParkId: '0',
    averageReview: 4,
    NumberOfReviews: 100,
    farAway: 2,
    NumberOfSpaces: 10,
    cordinates: {
      lat: 6.9271,
      log: 79.8612,
    },
    discount: 20,
    parkFacilities: [
      {
        name: 'EV Charging ',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PGtjq9Rso6JaQbk6rFNhv6xgYMsDuHHaNA&s',
      },
      {
        name: 'Washrooms',
        image:
          'https://us.123rf.com/450wm/moleks/moleks1510/moleks151000761/47460950-man-woman-restroom-sign-icon-vector-button-symbol-concept.jpg?ver=6',
      },
      {
        name: 'Play Area ',
        image:
          'https://media1.thehungryjpeg.com/thumbs/800_3999234_1kfchw9fwzszfaoqvesh689wdvj1sz8607f6pm0d.jpg',
      },
    ],
    id: '2',
    AvailableSlots: 10,
  },
  {
    ParkName: 'Park4',
    ParkAddress: 'No:27,Colombo-01',
    // ParkImage: require(''),
    images:
      'https://www.premiumcarparks.co.uk/themes/hambern-hambern-blank-bootstrap-4/assets/img/PCPPhoto3sizedforWeb.jpg',
    ParkRating: 4,
    Rating: 4,
    farAway: 2,
    ParkPrice: 100,
    ParkId: '0',
    averageReview: 4,
    NumberOfReviews: 100,
    farAway: 2,
    NumberOfSpaces: 10,
    cordinates: {
      lat: 6.9271,
      log: 79.8612,
    },
    discount: 20,
    parkFacilities: [
      {
        name: 'EV Charging ',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PGtjq9Rso6JaQbk6rFNhv6xgYMsDuHHaNA&s',
      },
      {
        name: 'Washrooms',
        image:
          'https://us.123rf.com/450wm/moleks/moleks1510/moleks151000761/47460950-man-woman-restroom-sign-icon-vector-button-symbol-concept.jpg?ver=6',
      },
      {
        name: 'Play Area ',
        image:
          'https://media1.thehungryjpeg.com/thumbs/800_3999234_1kfchw9fwzszfaoqvesh689wdvj1sz8607f6pm0d.jpg',
      },
    ],
    id: '3',
    AvailableSlots: 10,
  },
];

export const parkFacilityData = [
  {
    name: 'EV Charging ',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PGtjq9Rso6JaQbk6rFNhv6xgYMsDuHHaNA&s',
  },

  {
    name: 'Play Area ',
    image:
      'https://media1.thehungryjpeg.com/thumbs/800_3999234_1kfchw9fwzszfaoqvesh689wdvj1sz8607f6pm0d.jpg',
  },
  {
    name: 'Washrooms',
    image:
      'https://us.123rf.com/450wm/moleks/moleks1510/moleks151000761/47460950-man-woman-restroom-sign-icon-vector-button-symbol-concept.jpg?ver=6',
  },
];


export const ParkData = [
  {
    title:'outdoor',
    special:false,
    key:0,
    AvailableSlots:12,
    slots:20,
  },
  {
    title:'floor-1',
    special:false,
    key:1,
    AvailableSlots:12,
    slots:20,
  },
  {
    title:'floor-2',
    special:false,
    key:2,
    AvailableSlots:12,
    slots:20,
  },
  {
    title:'floor-3',
    special:false,
    key:3,
    AvailableSlots:12,
    slots:20,
  },

];

export const specialData = [
  {
    title:'24-hours securty',
    key:0,
  },
  {
    title:'CCTV',
    key:1,
  },

];

export const floor1=[
  { id: 'A-1', status: 'BOOKED', key:0},
  { id: 'A-2', status: 'BOOKED', key:1 },
  { id: 'A-3', status: 'BOOKED' , key:2},
  { id: 'A-4', status: 'AVAILABLE' , key:3},
  { id: 'A-5', status: 'BOOKED' , key:4},
  { id: 'A-6', status: 'BOOKED' , key:5},
  { id: 'A-7', status: 'BOOKED' , key:6},
  { id: 'A-8', status: 'BOOKED' , key:7},
];
export const floor2=[
  { id: 'A-1', status: 'BOOKED', key:0},
  { id: 'A-2', status: 'BOOKED', key:1 },
  { id: 'A-3', status: 'BOOKED' , key:2},
  { id: 'A-4', status: 'AVAILABLE' , key:3},
  { id: 'A-5', status: 'BOOKED' , key:4},
  { id: 'A-6', status: 'BOOKED' , key:5},
  { id: 'A-7', status: 'BOOKED' , key:6},
  { id: 'A-8', status: 'BOOKED' , key:7},
];
export const floor3=[
  { id: 'A-1', status: 'BOOKED', key:0},
  { id: 'A-2', status: 'BOOKED', key:1 },
  { id: 'A-3', status: 'BOOKED' , key:2},
  { id: 'A-4', status: 'AVAILABLE' , key:3},
  { id: 'A-5', status: 'BOOKED' , key:4},
  { id: 'A-6', status: 'BOOKED' , key:5},
  { id: 'A-7', status: 'BOOKED' , key:6},
  { id: 'A-8', status: 'BOOKED' , key:7},
];
export const floor4=[
  { id: 'A-1', status: 'BOOKED', key:0},
  { id: 'A-2', status: 'BOOKED', key:1 },
  { id: 'A-3', status: 'BOOKED' , key:2},
  { id: 'A-4', status: 'AVAILABLE' , key:3},
  { id: 'A-5', status: 'BOOKED' , key:4},
  { id: 'A-6', status: 'BOOKED' , key:5},
  { id: 'A-7', status: 'BOOKED' , key:6},
  { id: 'A-8', status: 'BOOKED' , key:7},
];