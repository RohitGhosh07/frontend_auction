import React from 'react';

const NavigationMenu = () => {
  return (
    <>
      {/* Styles */}
      <style>
        {`
          @import url(https://pro.fontawesome.com/releases/v5.10.0/css/all.css);
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;800&display=swap');
          body {
              font-family: 'Poppins', sans-serif;
              background-color: transparent; /* Set the background to transparent */
          }
          .hover\\:w-full:hover {
              width: 100%;
          }
          .group:hover .group-hover\\:w-full {
              width: 100%;
          }
          .group:hover .group-hover\\:inline-block {
              display: inline-block;
          }
          .group:hover .group-hover\\:flex-grow {
              flex-grow: 1;
          }
        `}
      </style>

      {/* JSX Structure */}
      <nav className="fixed -bottom-24 left-0 right-0 z-50 min-w-screen bg-transparent flex items-center justify-center px-5 pb-24">
        <div className="w-full max-w-md mx-auto">
          <div className="px-7 bg-slate-300 shadow-lg rounded-2xl mb-5">
            <div className="flex">
              <div className="flex-auto hover:w-full group">
                <a href="#" className="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-indigo-500">
                  <span className="block px-1 py-1 group-hover:bg-indigo-100 rounded-full group-hover:flex-grow">
                    <i className="far fa-home text-2xl pt-1"></i><span className="hidden group-hover:inline-block ml-3 align-bottom pb-1">Statistics</span>
                  </span>
                </a>
              </div>
              <div className="flex-auto hover:w-full group">
                <a href="#bidding" className="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-indigo-500">
                  <span className="block px-1 py-1 group-hover:bg-indigo-100 rounded-full group-hover:flex-grow">
                    <i className="far fa-compass text-2xl pt-1"></i><span className="hidden group-hover:inline-block ml-3 align-bottom pb-1">Bidding</span>
                  </span>
                </a>
              </div>
              {/* <div className="flex-auto hover:w-full group">
                <a href="#about" className="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-indigo-500">
                  <span className="block px-1 py-1 group-hover:bg-indigo-100 rounded-full group-hover:flex-grow">
                    <i className="far fa-search text-2xl pt-1"></i><span className="hidden group-hover:inline-block ml-3 align-bottom pb-1">About Us</span>
                  </span>
                </a>
              </div> */}
              {/* <div className="flex-auto hover:w-full group">
                <a href="#" className="flex items-center justify-center text-center mx-auto px-4 py-2 group-hover:w-full text-indigo-500">
                  <span className="block px-1 py-1 group-hover:bg-indigo-100 rounded-full group-hover:flex-grow">
                    <i className="far fa-cog text-2xl pt-1"></i><span className="hidden group-hover:inline-block ml-3 align-bottom pb-1">Profile</span>
                  </span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;
