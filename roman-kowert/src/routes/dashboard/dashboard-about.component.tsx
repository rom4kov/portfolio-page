import React from "react";

const DashboardAbout = () => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h2 className="text-2xl mt-3">Edit About Content</h2>
      <h3 >Change About Text</h3>
      <form action="" className="flex flex-col w-96 gap-3">
        <label htmlFor="text">Text</label>
        <input type="text" />
        <input type="text" />
        <button>Update</button>
      </form>
    </div>
  );
};

export default DashboardAbout;
