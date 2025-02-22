import { ScrollMode, SpecialZoomLevel, Viewer, ViewMode, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { zoomPlugin } from '@react-pdf-viewer/zoom';

const base64toBlob = (data: string, pdfContentType: 'application/pdf') => {
  const base64WithoutPrefix = data.substr(`data:${pdfContentType};base64,`.length);
  const bytes = atob(base64WithoutPrefix);
  let length = bytes.length;
  const out = new Uint8Array(length);
  while (length--) {
    out[length] = bytes.charCodeAt(length);
  }
  return new Blob([out], { type: pdfContentType });
};

const PdfViewerHelper = ({ url }: { url: string }) => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();
  const zoomPluginInstance = zoomPlugin();
  const rotatePluginInstance = rotatePlugin();

  return (
    <div style={{ height: 'calc(100% - 50px)', overflow: 'auto' }}>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
        <Viewer
          fileUrl={url}
          plugins={[pageNavigationPluginInstance, thumbnailPluginInstance, zoomPluginInstance, rotatePluginInstance]}
          defaultScale={SpecialZoomLevel.PageWidth}
          scrollMode={ScrollMode.Vertical}
          viewMode={ViewMode.SinglePage}
        />
      </Worker>
    </div>
  );
};

export const PdfViewer = ({ base64Data }: { base64Data: string }) => {
  const url = URL.createObjectURL(base64toBlob(`data:application/pdf;base64,${base64Data}`, 'application/pdf'));

  return <PdfViewerHelper url={url} />;
};
