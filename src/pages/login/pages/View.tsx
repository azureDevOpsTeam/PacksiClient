import React from 'react';
import LoginForm from '../components/Form/LoginForm';
import LoginAirplane from "../../../assets/images/LoginAirplan.png";

function View() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-[1200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-5/12 flex items-center justify-center p-4 md:p-6">
              <LoginForm/>
            </div>
            <div className="hidden md:flex w-7/12 h-[600px]">
              <img
                src={LoginAirplane}
                alt="Login Airplane"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
    </div>
  );
}

export default View;
