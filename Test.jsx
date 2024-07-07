import React, { useEffect, useState } from "react";

export const Test = () => {
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    const fetchatdata = async () => {
      // getting response from server based on the user prompt
      const response = await fetch("http://localhost:2000/aiCompletion", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: "what you can do ?" }),
      });
      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      // Here we start prepping for the streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const loopRunner = true;

      while (loopRunner) {
        // Here we start reading the stream, until its done.
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        setAnswer((answer) => answer + decodedChunk); // update state with new chunk
      }
    };

    fetchatdata();
  }, []);

  console.log("=====answer", answer);
  return <div>{answer}</div>;
};
