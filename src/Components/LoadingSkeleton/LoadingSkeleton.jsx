import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="bg-white p-3 rounded-md shadow-sm drop-shadow-sm w-[80%] min-w-[37rem] flex flex-col justify-center items-start gap-3">
      <p className="flex justify-start items-center h-10 overflow-hidden gap-2">
        <span className="bg-gray-200/80 h-[2.5rem] w-auto min-w-[2.6rem] rounded-full animate-pulse">
          &nbsp;
        </span>
        {/* post title */}
        <span className=" w-20 flex flex-col gap-1">
          <span className="bg-gray-200/80 animate-pulse h-[0.8rem] rounded-sm">
            &nbsp;
          </span>
          <span className="bg-gray-200/80 animate-pulse h-[0.8rem] w-40 rounded-sm">
            &nbsp;
          </span>
        </span>
      </p>
      {/* for image box */}
      <p className="w-full rounded-sm h-10 flex flex-col gap-1">
        <span className="bg-gray-200/80 animate-pulse h-[0.8rem] rounded-sm">
          &nbsp;
        </span>
        <span className="bg-gray-200/80 animate-pulse h-[0.8rem] rounded-sm">
          &nbsp;
        </span>
        <span className="bg-gray-200/80 animate-pulse h-[0.8rem] w-[90%] rounded-sm">
          &nbsp;
        </span>
      </p>
      <p className="bg-gray-200/80 animate-pulse w-full rounded-sm h-[20rem]">
        &nbsp;
      </p>
      {/* for reaction icons
       */}
      <p className="bg-gray-200/80 animate-pulse w-full rounded-sm h-10">
        &nbsp;
      </p>
    </div>
  );
};

export default LoadingSkeleton;
