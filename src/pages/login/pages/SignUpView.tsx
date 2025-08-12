import React from 'react';
import SignUpForm from '../components/Form/SignUpForm';
import LoginAirplane from '../../../assets/images/LoginAirplan.png';

function View() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <SignUpForm/>
      </div>
      <div className="hidden lg:flex w-1/2 h-full">
        <img
          src={LoginAirplane}
          alt="Airplane"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default View;
