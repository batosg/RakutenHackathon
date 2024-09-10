import React from "react";

interface User {
  name: string;
  image: string; // URL to the image or path to the local image
}

interface CircleOutlineWithImageProps {
  user: User;
}

const CircleOutlineWithImage: React.FC<CircleOutlineWithImageProps> = ({
  user,
}) => {
  return (
    <div className=" mt-4 flex items-center ">
      <div className=" mt-4 flex items-center">
        <img src={user.image} alt={user.name} className="w-16 h-16 " />
        <div className="ml-4 flex items-center">
          <p className="text-lg font-bold">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CircleOutlineWithImage;
