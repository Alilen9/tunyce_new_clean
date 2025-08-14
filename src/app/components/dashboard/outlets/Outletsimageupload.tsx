// import React, { useState, useCallback } from 'react';
// import axios from 'axios';
// import { Accept, useDropzone } from 'react-dropzone';


// interface ChildProps {
//     onRestaurantText: (text: string) => void;
// }

// const OutletImageUpload: React.FC<ChildProps> = ({ onRestaurantText }) => {
//     const [imageUrl, setImageUrl] = useState<string>("");

//     const onDrop = useCallback(async (acceptedFiles: File[]) => {
//         const file = acceptedFiles[0];

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             // Replace YOUR_ENDPOINT_HERE with the actual endpoint URL
//             const response = await axios.post<{
//                 AdvertPath: string
//             }>('https://media.tunycemedia.com/upload/advert', formData);

//             // Assuming the response contains the image URL
//             const { AdvertPath } = response.data;

//             setImageUrl(AdvertPath);
//             onRestaurantText(AdvertPath)
//             console.log('Image uploaded successfully. URL:', AdvertPath);
//         } catch (error) {
//             console.error('Error uploading image:', (error as { message: string }).message);
//         }
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         accept: 'image/*' as unknown as Accept | undefined,
//         onDrop,
//     });

//     return (
//         <div className="container mx-auto mt-8">
//             {!imageUrl && (<div {...getRootProps()} className={dropzoneStyle(isDragActive)}>
//                 <input {...getInputProps()} />
//                 <p className="text-lg text-gray-600">
//                     {isDragActive
//                         ? 'Drop the image here...'
//                         : 'Drag \'n\' drop an image here, or click to select one'}
//                 </p>
//             </div>)}
//             {imageUrl && (
//                 <div className="mt-4">
//                     <img src={imageUrl} alt="Uploaded" className="mt-2 max-w-full h-auto" />
//                 </div>
//             )}
//         </div>
//     );
// };

// const dropzoneStyle = (isDragActive: boolean) => `
//   border-2 ${isDragActive ? 'border-green-500' : 'border-gray-300'} 
//   border-dashed rounded p-8 text-center cursor-pointer`;

// export default OutletImageUpload;
