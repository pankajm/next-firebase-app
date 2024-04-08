"use client";
import React from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const page = () => {
  const { user, loading } = useAuth();
  return (
    <div className="flex justify-center items-center mt-8">
      {loading ? (
        <Loader />
      ) : user ? (
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={user?.photoURL} alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Name - {user?.displayName}</h2>
            <h2>Email - {user?.email}</h2>
          </div>
        </div>
      ) : (
        <h1>You must be logged in to see this page</h1>
      )}{" "}
    </div>
  );
};

export default page;
