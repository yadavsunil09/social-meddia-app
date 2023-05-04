import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import PostContainer from "../Components/PostContainer/PostContainer";
import LoadingSkeleton from "../Components/LoadingSkeleton/LoadingSkeleton";

const HomePage = () => {
  return (
    <div>
      <HomeLayout
        children={
          <div className="flex flex-col justify-center items-center gap-10 bg-[#fafafa]">
            {/* <LoadingSkeleton /> */}
            <PostContainer
              userDetail={"username"}
              postDescription={
                "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt tenetur possimus architecto voluptates iure atque est ipsam eius velit ducimus nostrum itaque, non, earum, maiores adipisci voluptatum sint? Maxime, recusandae\
                "
              }
            />
            <PostContainer
              userDetail={"username"}
              postDescription={
                "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt tenetur possimus architecto voluptates iure atque est ipsam eius velit ducimus nostrum itaque, non, earum, maiores adipisci voluptatum sint? Maxime, recusandae\
                "
              }
            />
            <PostContainer
              userDetail={"username"}
              postDescription={
                "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt tenetur possimus architecto voluptates iure atque est ipsam eius velit ducimus nostrum itaque, non, earum, maiores adipisci voluptatum sint? Maxime, recusandae\
                "
              }
            />
            <PostContainer
              userDetail={"username"}
              postDescription={
                "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt tenetur possimus architecto voluptates iure atque est ipsam eius velit ducimus nostrum itaque, non, earum, maiores adipisci voluptatum sint? Maxime, recusandae\
                "
              }
            />
            <PostContainer
              userDetail={"username"}
              postDescription={
                "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt tenetur possimus architecto voluptates iure atque est ipsam eius velit ducimus nostrum itaque, non, earum, maiores adipisci voluptatum sint? Maxime, recusandae\
                "
              }
            />
            <PostContainer
              userDetail={"username"}
              postDescription={
                "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt tenetur possimus architecto voluptates iure atque est ipsam eius velit ducimus nostrum itaque, non, earum, maiores adipisci voluptatum sint? Maxime, recusandae\
                "
              }
            />
          </div>
        }
      />
    </div>
  );
};

export default HomePage;
