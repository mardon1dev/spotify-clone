import React from "react";

const Aside = () => {
  return (
    <div className="w-[25%] p-5 h-screen sticky top-0 bg-[#000]">
      <div className="flex items-center justify-between mb-[35px]">
        <h2 className="text-[20px] text-[#CCCCCC] font-bold">
          Friend Activity
        </h2>
        <div className="flex items-center space-x-5">
          {/* <UserIcon />
          <CloseIcon /> */}
        </div>
      </div>
      <p className="text-[18px] mb-[23px] text-[#CCCCCC] font-medium">
        Let friends and followers on Spotify see what you’re listening to.
      </p>
      <div className="flex flex-col space-y-5 mb-5">
        {/* <img src={UserImg} alt="user img" width={179} height={62} />
        <img src={UserImg} alt="user img" width={179} height={62} />
        <img src={UserImg} alt="user img" width={179} height={62} /> */}
      </div>
      <p className="text-[18px] mb-[23px] text-[#CCCCCC] font-medium">
        {
          "Go to Settings > Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time."
        }
      </p>
      <button className="w-[233px] rounded-[40px] block mx-auto py-5 bg-white text-[#171717] hover:opacity-80 duration-300 text-[18px] font-bold">
        SETTINGS
      </button>
    </div>
  );
};

export default Aside;
