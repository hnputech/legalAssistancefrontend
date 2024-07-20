// import React, { useState, useRef, useEffect } from "react";
// import JoditEditor from "jodit-react";
// import showdown from "showdown";
// import { axioxInstance } from "../../requests/apiInstance";

// const config = {
//   height: "80vh",
//   width: "60vw",
//   removeButtons: ["image", "video", "file", "speechRecognize", "about"],
// };
// export const TemplateEditor = () => {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");
//   console.log("======content", content);
//   const converter = new showdown.Converter({
//     omitExtraWLInCodeBlocks: true,
//     simplifiedAutoLink: true,
//     strikethrough: true,
//   });

//   //   useEffect(() => {
//   const fetchatdata = async () => {
//     // getting response from server based on the user prompt
//     const response = await fetch("http://localhost:3001/templateGenerator", {
//       method: "post",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userPrompt: "what you can do ?" }),
//     });
//     if (!response.ok || !response.body) {
//       throw response.statusText;
//     }

//     // Here we start prepping for the streaming response
//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     const loopRunner = true;

//     while (loopRunner) {
//       // Here we start reading the stream, until its done.
//       const { value, done } = await reader.read();
//       if (done) {
//         break;
//       }
//       const decodedChunk = decoder.decode(value, { stream: true });
//       //   setContent(decodedChunk); //
//       setContent((answer) => answer + decodedChunk);
//     }
//   };

//   //   }, []);

//   return (
//     <>
//       <button onClick={() => fetchatdata()}>click me</button>
//       <JoditEditor
//         ref={editor}
//         value={converter.makeHtml(content)}
//         config={config}
//         //   tabIndex={1} // tabIndex of textarea
//         onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//         //   onChange={(newContent) => setContent(newContent)}
//       />
//     </>
//   );
// };

import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import showdown from "showdown";

import jsPDF from "jspdf";
import { saveAs } from "file-saver";

const config = {
  height: "80vh",
  width: "60vw",
  removeButtons: ["image", "video", "file", "speechRecognize", "about"],
};

export const TemplateEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    simplifiedAutoLink: true,
    strikethrough: true,
  });

  const fetchChatData = async () => {
    try {
      const response = await fetch("http://localhost:3001/templateGenerator", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: "what you can do ?" }),
      });

      if (!response.ok || !response.body) {
        throw new Error(response.statusText);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedChunk = decoder.decode(value, { stream: true });
        setContent((prevContent) => prevContent + decodedChunk);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  // this is testing

  const printDocument = () => {
    const input = document.getElementsByClassName("jodit-wysiwyg")[0];
    console.log("====inpout ", input);

    const pdf = new jsPDF("p", "pt", "a4");

    // Calculate the height required to fit content on an A4 page
    const specialElementHandlers = {
      "#editor": function(element, renderer) {
        return true;
      },
    };

    pdf.html(input, {
      callback: function(pdf) {
        pdf.save("myfile.pdf");
      },
      x: 10,
      y: 15,
      autoPaging: "text", // Enable auto pagination
      html2canvas: {
        // Set html2canvas options
        scale: 0.5, // Scale down HTML to fit into the PDF
      },
    });
  };

  const handleDownloadDoc = () => {
    const input = document.getElementsByClassName("jodit-wysiwyg")[0].innerHTML;

    const blob = new Blob([input], { type: "application/msword" });
    saveAs(blob, "content.doc");
  };

  const handleCopyClipboard = () => {
    const input = document.getElementsByClassName("jodit-wysiwyg")[0].innerHTML;

    navigator.clipboard.writeText(input).then(() => {
      alert("Content copied to clipboard");
    });
  };
  //  testing end

  return (
    <>
      <button onClick={() => fetchChatData()}>fetch data</button>

      <button onClick={() => handleDownloadDoc()}>doc </button>
      <button
        onClick={printDocument}
        // onClick={() => {
        //   const idwala = document.getElementById("mim");
        //   console.log(idwala);
        //   const collection = document.getElementsByClassName("jodit-wysiwyg");
        //   console.log("collection", collection[0]);
        // }}
      >
        Click me
      </button>
      <button onClick={() => handleCopyClipboard()}>copy </button>

      <div id="mim">
        <div>inner</div>
      </div>
      <JoditEditor
        ref={editor}
        value={converter.makeHtml(content)}
        config={config}
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />
    </>
  );
};
