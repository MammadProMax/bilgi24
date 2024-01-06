import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { updateProfileImage } from "@/actions/user";
import { convertToBase64 } from "@/lib/utils";

import { Camera, File as FileIcon, UploadCloud } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

type ProfileImgModalProps = {
   ImageSrc: string;
   onImageChange: (path: string) => void;
};
export default function ProfileImgModal({
   ImageSrc,
   onImageChange,
}: ProfileImgModalProps) {
   const [open, setOpen] = useState(false);
   const [errMessage, setErrMessage] = useState("");
   const [uploadProccess, setUploadProccess] = useState(0);
   const router = useRouter();

   const { mutate } = useMutation({
      mutationFn: updateProfileImage,
      mutationKey: ["updateProfileImg"],
      onMutate: () => {
         const id = processUploadProgress(setUploadProccess, false);
         return {
            intervalId: id,
         };
      },
      onSuccess: (data, _var, context) => {
         clearInterval(context.intervalId);
         setUploadProccess(100);
         toast.success("Profile image uploaded", { dismissible: true });

         const newImagePath = data.data.path as string;
         onImageChange(newImagePath);
         setOpen(false);
         router.refresh();
      },
      onError: (err, _var, context) => {
         clearInterval(context?.intervalId); // clear interval
         setUploadProccess(0);
         toast.error("Something went wrong");
         console.log(err);
      },
   });

   const handleDrop = async (acceptedFiles: File[]) => {
      setUploadProccess(0);
      const isValid = validateFile(acceptedFiles[0]);
      if (!isValid) return;

      const formData = new FormData();
      convertToBase64(acceptedFiles[0], (base64) => {
         formData.append("image", base64 as string);
         mutate(formData);
      });
   };

   const validateFile = (file: File) => {
      const allowedTypes = [
         "image/jpeg",
         "image/png",
         "image/jpg",
         "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
         setErrMessage("file type must be jpeg, png or jpg");
         return false;
      }
      if (file.size > 1048576) {
         setErrMessage("file size must be less than 1MB");
         return false;
      }
      setErrMessage("");
      return true;
   };

   const uploadingContent = (fileName: string) => (
      <>
         <FileIcon className="w-8 h-8 text-primary" />
         <p>{fileName}</p>
         <Slider
            className="w-[60%] overflow-hidden h-[5px]"
            trackClassName="bg-gray-200"
            rangeClassName="bg-secondary"
            min={0}
            max={100}
            hasThumb={false}
            value={[uploadProccess]}
         />
         <p className="text-xs text-muted-foreground mt-1">
            please wait until upload is completed
         </p>
      </>
   );

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger>
            <Image
               src={ImageSrc}
               alt="profile image"
               width={150}
               height={150}
            />
            <Camera className="w-5 h-5 absolute top-1 left-1 text-secondary" />
         </DialogTrigger>
         <DialogContent>
            <Dropzone onDrop={handleDrop}>
               {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div
                     {...getRootProps()}
                     className="bg-accent my-5 mx-1 border border-dashed border-border h-44 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                     <input {...getInputProps()} />

                     {!errMessage && acceptedFiles.length ? (
                        // "shows when uploading"
                        uploadingContent(acceptedFiles[0].name)
                     ) : (
                        <>
                           <UploadCloud className="w-16 h-16 text-primary" />
                           <h1 className="text-lg font-semibold">
                              Drop your file here, or{" "}
                              <span className="text-secondary">Browse</span>
                           </h1>
                           {!errMessage ? (
                              <p className="text-muted-foreground text-sm">
                                 PNG, JPG files are alowed (max. 1MB)
                              </p>
                           ) : (
                              <div className="text-destructive text-sm font-semibold">
                                 {errMessage}
                              </div>
                           )}
                        </>
                     )}
                  </div>
               )}
            </Dropzone>
         </DialogContent>
      </Dialog>
   );
}

const processUploadProgress = (
   onChange: React.Dispatch<React.SetStateAction<number>>,
   clear: boolean
) => {
   const interval = setInterval(() => {
      onChange((pre) => (pre >= 95 ? 95 : pre + 5));
   }, 1000);

   return interval;
};
