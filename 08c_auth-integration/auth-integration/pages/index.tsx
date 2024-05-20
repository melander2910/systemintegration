import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { constants } from "../constants";


function index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(user);
    return (
      <div>
        Welcome {user.sub} <a href="/api/auth/logout">Logout</a>
        <br></br>
        Your nickname is {user.nickname}.
        <a style={{margin: 200}} href={constants.paymentLinks.monthlySubscription}><button style={{border: 3, color: "green"}}>Buy subscription</button></a>
      </div>
    );
  }
  return <a href="/api/auth/login">Login</a>;
}

export default index;