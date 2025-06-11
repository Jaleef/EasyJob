import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// 设置 PDF.js 的 worker 路径
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const Pdf = (props: { url: string }) => {
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      {numPages !== null ? (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      ) : (
        <p>Loading PDF pages...</p>
      )}
      <button
        disabled={pageNumber <= 1 || numPages === null}
        onClick={() => setPageNumber((prevPageNumber) => prevPageNumber - 1)}
      >
        Previous
      </button>
      <button
        disabled={pageNumber >= (numPages || 1) || numPages === null}
        onClick={() => setPageNumber((prevPageNumber) => prevPageNumber + 1)}
      >
        Next
      </button>
    </div>
  );
};