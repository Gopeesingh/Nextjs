

import EditSnippetForm from "@/components/editSnippetform";
import { prisma } from "@/lib/prisma";
import React from "react";

const EditSnippetPage = async ({ params, }: { params: Promise<{ id: string }>; }) => {
    // console.log("Params:", params);
const id = parseInt((await params).id);

const snippet = await prisma.snippets.findUnique({
    where: {
        id,
    },
    });
        if (!snippet) return <h1>Snippet not found</h1>;

    return <EditSnippetForm snippet={snippet} />;
};

export default EditSnippetPage;
