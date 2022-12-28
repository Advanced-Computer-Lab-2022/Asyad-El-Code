import React from "react";
import { useHistory } from "react-router-dom";
import "./test.css";
export default function App() {
  const history = useHistory();

  return (
    <>
      <body>
        <div class="background">
          <div class="splash">
            <div class="splash_logo">aSyad</div>
            <div class="splash_svg">
              <svg width="100%" height="100%">
                <rect width="100%" height="100%"></rect>
              </svg>
            </div>
            <div class="splash_minimize">
              <svg width="100%" height="100%">
                <rect width="100%" height="100%"></rect>
              </svg>
            </div>
          </div>
          <div class="text">
            <p>EDUCATE</p>
            <p> YOUR SELF </p>
            <button onClick={() => history.push("/home")}>US</button>
          </div>
        </div>
      </body>
    </>
  );
}
