import { CKEditor } from 'ckeditor4-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const PreviewFile = (): JSX.Element => {
  return (
    <>
      <h2>using ckeditor</h2>
      <CKEditor
        initialData={<p>Hello world</p>}
        onInstanceReady={() => {
          console.warn('ready');
        }}
      />
    </>
  );
};

export default PreviewFile;
