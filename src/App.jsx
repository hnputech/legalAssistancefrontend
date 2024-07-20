import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import showdown from "showdown";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
// import puppeteer from "puppeteer";

const dd = `<div> 
<h1>Itaque nostrum est-quod nostrum dico, artis est-ad ea principia, quae accepimus.</h1>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <em>Quonam, inquit, modo?</em> <mark>Illum mallem levares, quo optimum atque humanissimum virum, Cn.</mark> Quae quidem vel cum periculo est quaerenda vobis; Amicitiam autem adhibendam esse censent,
    quia sit ex eo genere, quae prosunt. <a href="http://loripsum.net/" target="_blank">Duo Reges: constructio interrete.</a> Illud quaero, quid ei, qui in voluptate summum bonum ponat, consentaneum sit dicere. At vero illa, quae Peripatetici, quae Stoici
    dicunt, semper tibi in ore sunt in iudiciis, in senatu. Dic in quovis conventu te omnia facere, ne doleas. Nummus in Croesi divitiis obscuratur, pars est tamen divitiarum. Isto modo ne improbos quidem, si essent boni viri. Luxuriam non reprehendit,
    modo sit vacua infinita cupiditate et timore. Sit ista in Graecorum levitate perversitas, qui maledictis insectantur eos, a quibus de veritate dissentiunt. </p>

<blockquote cite="http://loripsum.net">
    Nec enim absolvi beata vita sapientis neque ad exitum perduci poterit, si prima quaeque bene ab eo consulta atque facta ipsius oblivione obruentur.
</blockquote>


<pre>Tum ille: Tu autem cum ipse tantum librorum habeas, quos hic
tandem requiris?

Possumusne ergo in vita summum bonum dicere, cum id ne in
cena quidem posse videamur?
</pre>


<ul>
    <li>Possumusne ergo in vita summum bonum dicere, cum id ne in cena quidem posse videamur?</li>
    <li>Quodsi vultum tibi, si incessum fingeres, quo gravior viderere, non esses tui similis;</li>
</ul>


<ol>
    <li>Qui autem diffidet perpetuitati bonorum suorum, timeat necesse est, ne aliquando amissis illis sit miser.</li>
    <li>Nulla profecto est, quin suam vim retineat a primo ad extremum.</li>
</ol>


<dl>
    <dt><dfn>Falli igitur possumus.</dfn></dt>
    <dd>Quid enim ab antiquis ex eo genere, quod ad disserendum valet, praetermissum est?</dd>
    <dt><dfn>Scrupulum, inquam, abeunti;</dfn></dt>
    <dd>Scio enim esse quosdam, qui quavis lingua philosophari possint;</dd>
    <dt><dfn>Poterat autem inpune;</dfn></dt>
    <dd>Tum ille: Tu autem cum ipse tantum librorum habeas, quos hic tandem requiris?</dd>
    <dt><dfn>Beatum, inquit.</dfn></dt>
    <dd>Respondeat totidem verbis.</dd>
</dl> </div>`;

function App() {
  const htmlContentRef = useRef();

  const [textData, setTextData] = useState(`# Sample Markdown
    import html2pdf from 'html2pdf.js';


This is some basic, sample markdown.

## Second Heading

 * Unordered lists, and:
  1. One
  1. Two
  1. Three
 * More

> Blockquote

And **bold**, *italics*, and even *italics and later **bold***. Even ~~strikethrough~~. [A link](https://markdowntohtml.com) to somewhere.

And code highlighting:

Or an image of bears

![bears](http://placebear.com/200/200)

The end ...
`);

  const [htmlMarkup, setHtmlMarkup] = useState(dd);

  const converter = new showdown.Converter({
    omitExtraWLInCodeBlocks: true,
    simplifiedAutoLink: true,
    strikethrough: true,
  });

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [4, 2],
  });

  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();
  //   const ss = converter.makeHtml(textData);
  //   doc.text(ss, 10, 10);
  //   doc.save("document.pdf");
  // };

  const [markdownData, setMarkdownData] = useState(
    "# Hello World\nThis is a markdown sample"
  );

  // Function to create a PDF from rendered HTML
  const handleDownloadPDF = async () => {
    // Convert Markdown to HTML
    const htmlContent = converter.makeHtml(markdownData);

    // Create a temporary div to render HTML content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.position = "fixed";
    tempDiv.style.top = "-9999px"; // Position it offscreen
    document.body.appendChild(tempDiv);

    // Use html2canvas to capture the rendered HTML
    const canvas = await html2canvas(tempDiv, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    document.body.removeChild(tempDiv);

    // Create PDF document
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Add the image to the PDF and save it
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("document.pdf");
  };

  const heldl = () => {
    doc.html(dd, {
      async callback(doc) {
        await doc.save("pdf_name");
      },
    });
  };

  const handleGeneratePdfd = () => {
    const opt = {
      margin: 1,
      filename: "output.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(dd)
      .save();
  };

  const handleGeneratePdf = () => {
    const element = htmlContentRef.current;

    // Define the options for the pdf generation
    const opt = {
      margin: 1,
      filename: "output.pdf",
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Create the PDF with the specified options
    html2pdf()
      .set(opt)
      .from(element)
      .save();
  };

  const test = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of the page
    await page.setContent(dd);

    // Convert the page to PDF
    await page.pdf({
      path: "documentd.pdf",
      format: "A4",
      printBackground: true,
    });

    await browser.close();
  };

  const printDocumentt = () => {
    const input = document.getElementById("divToPrint");
    const opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf()
      .from(input)
      .set(opt)
      .save();
  };

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
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
      y: 10,
      autoPaging: "text", // Enable auto pagination
      html2canvas: {
        // Set html2canvas options
        scale: 0.5, // Scale down HTML to fit into the PDF
      },
    });
  };

  return (
    // <div>
    //   <div
    //     id="divToPrint"
    //     dangerouslySetInnerHTML={{ __html: htmlMarkup }}
    //     style={{ display: "none" }}
    //   />
    //   <button onClick={printDocument}>Download as PDF</button>
    // </div>
    // <div>
    //   <div id="divToPrint" dangerouslySetInnerHTML={{ __html: htmlMarkup }} />
    //   <button onClick={printDocumentt}>Download as PDF</button>
    // </div>
    //
    // <div>
    //   <button onClick={test}>Generate PDF</button>

    //   <div ref={htmlContentRef} dangerouslySetInnerHTML={{ __html: dd }} />
    // </div>

    <Provider store={store}>
      <div className="App .main-content">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
