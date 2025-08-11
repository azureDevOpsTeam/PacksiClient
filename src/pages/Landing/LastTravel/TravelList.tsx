// pages/TravelList.tsx
import React from 'react';
import TravelCard from './TravelCard';

const travelData = [

  {
    from: {
      code: 'IST',
      city: 'Istanbul',
      airport: 'Istanbul Airport',
      date: 'Wed 27 Jan',
      time: '01:00PM',
    },
    to: {
      code: 'ATH',
      city: 'Athens',
      airport: 'Eleftherios Venizelos Airport',
      date: 'Wed 27 Jan',
      time: '02:45PM',
    },
    duration: '1h 45m',
    flightType: 'non-stop',
    airline: 'TURKISH AIRLINES',
    price: '$620',
  },
  {
    from: {
      code: 'MAD',
      city: 'Madrid',
      airport: 'Barajas Airport',
      date: 'Thu 28 Jan',
      time: '06:45AM',
    },
    to: {
      code: 'ROM',
      city: 'Rome',
      airport: 'Fiumicino Airport',
      date: 'Thu 28 Jan',
      time: '08:30AM',
    },
    duration: '1h 45m',
    flightType: 'non-stop',
    airline: 'IBERIA',
    price: '$740',
  },
  {
    from: {
      code: 'DXB',
      city: 'Dubai',
      airport: 'Dubai International Airport',
      date: 'Fri 29 Jan',
      time: '11:00PM',
    },
    to: {
      code: 'DEL',
      city: 'Delhi',
      airport: 'Indira Gandhi International Airport',
      date: 'Sat 30 Jan',
      time: '03:15AM',
    },
    duration: '3h 45m',
    flightType: 'non-stop',
    airline: 'EMIRATES',
    price: '$980',
  },
];


export default function TravelList() {
  return (
    <div className="flex gap-4 overflow-x-auto ">
      {travelData.map((item, index) => (
        <TravelCard key={index} {...item} />
      ))}
    </div>
  );
}
