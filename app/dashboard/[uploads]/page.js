"use client"

import { DocumentUpload } from "iconsax-react";
import {useDropzone} from 'react-dropzone'
import axiosInterceptorInstance from '@utils/axiosInstance'
import { useState } from "react";
import UploadModal from '@components/modals/UploadModal'
import { uploadsData } from "@utils/uploadsData";

const page = ({params}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [copyItem, setCopyItem] = useState(false)
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }
  const pageType = params.uploads
  const pageTypeData = uploadsData[pageType]


  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({    
    maxFiles:1,
    multiple: false
  });
  const files = acceptedFiles.map(file => (
    <li className="list-none inline" key={file.path}>
      {file.path} - {file.size} bytes
    </li>

  ));
  const upLoadDocument = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData() 
    formData.append("file", acceptedFiles[0])
    const config = {
      method : 'post',
      url : `/api/v1/master/type?type=${pageTypeData.type}`,
      headers: { "Content-Type": "multipart/form-data" },
      data : formData
    }

    axiosInterceptorInstance(config)
    .then((response) => {
      setIsLoading(false)
      setIsOpen(true)
      setCopyItem(response.data.data)
    })
    .catch((error) => {
      setIsLoading(false)
      setIsOpen(true)


    })
  }

  return (
    <>
    <UploadModal  isOpen={isOpen} copyItem={copyItem} closeModal={closeModal} />
      <div className="text-2xl text-zinc-800 font-bold">{pageTypeData.title}</div>
      <form onSubmit={upLoadDocument} >
        <div className="mt-2 bg-violet-100 min-h-[200px] flex justify-center bg-opacity-50 rounded-lg border border-dashed border-gray-900/25 px-8 py-12 items-center">
          <div className="text-center">
            <div className="m-12 flex text-sm leading-6 text-gray-600" {...getRootProps({className: 'dropzone'})}>
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer text-zinc-500 text-sm font-medium"
              >
                
                <span>
                  <DocumentUpload
                    className="inline"
                    size="22"
                    color="#5C2684"
                    variant="Bold"
                  />
                  {files != "" ? files : <span>Drag your file or <font className="text-indigo-500">Click here</font> to include file</span>}
                </span>
                <input
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  {...getInputProps()}
                />
              </label>
            </div>
          </div>
       
        </div>
        <div className="flex flex-row-reverse mt-12">
          {isLoading ?  (<button className="rounded-md bg-purple-300 text-white text-[12px] font-semibold px-10 py-2" disabled>
          Loading
        </button>) :  (<button className="rounded-md bg-purple-800 text-white text-[12px] font-semibold px-10 py-2">
            Upload
        </button>) }
       
      </div>
      </form>
    
    </>
  );
};

export default page;
