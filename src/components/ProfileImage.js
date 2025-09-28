import React from "react";

const ImageUpload = ({ onImageUpload, previewImage }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result.split(',')[1]); // Base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-upload-container">
      <label className="image-upload-label" htmlFor="file-upload">
        <span>Upload Image</span>
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} />
      {previewImage && (
        <img src={`data:image/png;base64,${previewImage}`} alt="Preview" className="image-preview" />
      )}
    </div>
  );
};

export default ImageUpload;
