"use client";
import { Resource, Section } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import FileUpload from "@/components/custom/FileUpload";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and must be at least 2 characters long ",
  }),
  fileUrl: z.string().min(1, {
    message: "File is required",
  }),
});

interface ResourceFormProps {
  section: Section & { resources: Resource[] };
  courseId: string;
}

// !
const ResourceForm = ({ section, courseId }: ResourceFormProps) => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fileUrl: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}/resources`,
        values
      );
      toast.success("New Resource uploaded!!");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong! ");
      console.log("Failed to upload a resource", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/sections/${section.id}/resources/${id}`
      );
      toast.success("Resource deleted!!");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong! ");
      console.log("Failed to delete the resource", error);
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center text-xl font-bold mt-12">
        <PlusCircle />
        Add Resources (optional)
      </div>
      <p className="text-sm font-medium mt-2">
        Add resources to this section to help students learn better.
      </p>

      <div className="mt-5 flex-col gap-5">
        {section.resources.map((resource) => (
          <div className="flex justify-between bg-[#eaa7ea]/40 rounded-lg text-sm font-medium p-3 mt-2">
            <div className="flex items-center ">
              <File className="h-4 w-4 mr-4 " />
              {resource.name}
            </div>
            <button
              className="text-[#9a369a]"
              disabled={isSubmitting}
              onClick={() => onDelete(resource.id)}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Textbook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* == file URL ==  */}
            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value || ""}
                      onChange={(url) => field.onChange(url)}
                      endpoint="sectionResource"
                      page="Edit Section"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ResourceForm;
