import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

// add mediaUrl
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      fieldChange(acceptedFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".svg", ".png", ".jpg", ".jpeg"] },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
          <img src={fileUrl} alt="image" className="file_uploader-img" />
          <p className="file_uploader-label">Click or Drag Photo to Replace</p>
        </div>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag Photo Here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG, JPEG</p>
          <Button className="shad-button_dark_4">Select from Device</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
