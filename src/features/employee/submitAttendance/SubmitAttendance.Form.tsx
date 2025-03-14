import { AppButton } from "@/components/appButton/AppButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ACCESS_TOKEN_KEY } from "@/constants/globals";
import {
  postAttendance,
  PostAttendanceRequestBody,
  PostAttendanceResponseData,
} from "@/data/attendance/attendance.api";
import { AppResponse } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { SubmitAttendanceSuccessDialog } from "./components/SubmitAttendanceSuccess.Dialog";
import { submitAttendanceSchema } from "./submitAttendance.schema";

export const SubmitAttendanceForm = () => {
  const defaultValues = useMemo(() => {
    return {
      reasonForWfh: "",
      workDescription: "",
    };
  }, []);
  const [proofImg, setProofImg] = useState<File | undefined>(undefined);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: (
      body: PostAttendanceRequestBody
    ): Promise<AppResponse<PostAttendanceResponseData>> => {
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (!token) {
        return Promise.resolve({
          message: "Unauthorized",
        });
      }
      if (!proofImg) {
        return Promise.resolve({
          message: "Please provide a proof image",
        });
      }
      return postAttendance(body, proofImg, token);
    },
    onSuccess: (data) => {
      if (!data.message && data.data) {
        console.log(data.data);
        setIsSuccessModalOpen(true);
      } else {
        toast(data.message);
      }
    },
  });

  const form = useForm<z.infer<typeof submitAttendanceSchema>>({
    resolver: zodResolver(submitAttendanceSchema),
    defaultValues: defaultValues,
    mode: "onTouched",
  });

  const onSubmit = (values: z.infer<typeof submitAttendanceSchema>) => {
    const formattedValues: PostAttendanceRequestBody = {
      work_description: values.workDescription,
      reason_for_wfh: values.reasonForWfh,
    };
    mutateAsync(formattedValues);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];

      if (validateFile(droppedFile)) {
        setProofImg(droppedFile);
        form.trigger("reasonForWfh");
        form.trigger("workDescription");
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];

    if (validateFile(selectedFile)) {
      setProofImg(selectedFile);
      form.trigger("reasonForWfh");
      form.trigger("workDescription");
    }
  };

  return (
    <>
      {isSuccessModalOpen && data?.data && (
        <SubmitAttendanceSuccessDialog
          data={data.data}
          open={isSuccessModalOpen}
          onOpenChange={setIsSuccessModalOpen}
          onExit={() => {
            form.reset(defaultValues);
            setProofImg(undefined);
          }}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="workDescription"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Work Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="workDescription"
                      placeholder="Describe your work for today"
                      required
                      className={`${
                        form.formState.errors.workDescription &&
                        "border-red-500"
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-sm font-medium">
                    <p className="text-red-500">
                      {form.formState.errors.workDescription?.message}
                    </p>
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reasonForWfh"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Reason for WFH</FormLabel>
                  <FormControl>
                    <Textarea
                      id="reasonForWfh"
                      placeholder="Why are you working from home today?"
                      required
                      className={`${
                        form.formState.errors.reasonForWfh && "border-red-500"
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-sm font-medium">
                    <p className="text-red-500">
                      {form.formState.errors.reasonForWfh?.message}
                    </p>
                  </div>
                </div>
              </FormItem>
            )}
          />
          <div className="mt-4">
            <p className="text-sm">Image Proof</p>
            <div
              className="flex flex-col gap-2 items-center justify-center w-full h-[400px] border-3 border-dashed border-app_black mt-2 mb-6"
              onClick={() => {
                document.getElementById("proofImg")!.click();
              }}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              {proofImg ? (
                <img
                  src={URL.createObjectURL(proofImg)}
                  className="object-scale-down h-full m-2"
                  alt="payment-proof"
                />
              ) : (
                <>
                  <p className="text-xl">
                    Drop a file or click anywhere in this box
                  </p>
                  <p>Allowed file types: .png .jpg .jpeg</p>
                  <p>Maximum file size: 5MB</p>
                </>
              )}
            </div>
            <Input
              id="proofImg"
              type="file"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>
          <AppButton
            className="min-w-24 w-1/3 ms-auto cursor-pointer"
            type="submit"
            state={
              isPending
                ? "Loading"
                : !proofImg || !form.formState.isValid
                ? "Disabled"
                : "Active"
            }
            onClick={() => {}}
          >
            Submit
          </AppButton>
        </form>
      </Form>
    </>
  );
};

const validateFile = (file: File): boolean => {
  if (file.size > 5000000) {
    alert("File size too big, please upload a file with size of at most 5MB");
    return false;
  }
  if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
    alert("Invalid file type. Please upload a .png, .jpg, or .jpeg file.");
    return false;
  }
  return true;
};
