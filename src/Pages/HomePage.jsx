import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import PostContainer from "../Components/PostContainer/PostContainer";
import LoadingSkeleton from "../Components/LoadingSkeleton/LoadingSkeleton";

const HomePage = () => {
  return (
    <div>
      <HomeLayout
        children={
          <>
            {/* <LoadingSkeleton /> */}
            <PostContainer />
          </>
        }
      />
    </div>
  );
};

export default HomePage;
