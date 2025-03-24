"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache"

export const saveSnippet = async (id: number, code: string) => {
  await prisma.snippets.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  revalidatePath(`/snippet/${id}`);
  redirect(`/snippet/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await prisma.snippets.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
};

export async function CreateSnippet(prevSatate: { message: string },formData: FormData) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 4) {
      return { message: "title is required and must br longer" };
    }
    if (typeof code !== "string" || code.length < 4) {
      return { message: "code is required and must br longer" };
    }

    await prisma.snippets.create({
      data: {
        title,
        code,
      },
    });
    revalidatePath("/")
    // throw new Error("Oops something went wrong");

    // console.log("created snippet", snippet)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "some internal server error" };
    }
  }

  redirect("/");
}
