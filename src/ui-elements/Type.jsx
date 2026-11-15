import React from "react";
import Typewriter from "typewriter-effect";

function Type({ textArray }) {
  return (
    <Typewriter
      options={{
        strings: textArray.length>0 ? textArray : ["A Developer", "A Creator"],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
