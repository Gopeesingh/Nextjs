import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import * as actions from "@/actions";
import snippetNotFound from "./not-found";
type SnippetDetailProps = {
    params: Promise<{ id: string }>;
};

const SnippetDetailPage: React.FC<SnippetDetailProps> = async ({ params }) => {
const id = parseInt((await params).id);

await new Promise((r) => setTimeout(r, 2000))
const snippet = await prisma.snippets.findUnique({
    where: {
    id,
    },
    });

if (!snippet) return snippetNotFound();
    const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
    return (
    <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">{snippet.title}</h1>
        <div className="flex items-center gap-2">
            <Link href={`/snippet/${snippet.id}/edit`}>
            <Button className="bg-green-600">Edit</Button>
            </Link>
            <form action={deleteSnippetAction}>
            <Button variant={"destructive"} className="bg-red-600 text-black">
                Delete
            </Button>
            </form>
        </div>
        </div>
      {/* <h1>{id}</h1> */}
        <pre className="p-3 bg-gray-200 rounded border-gray-200">
        <code>{snippet.code}</code>
        </pre>
    </div>
    );
};

export default SnippetDetailPage;

export const generateStaticParams = async() => {
    const snippets = await prisma.snippets.findMany();
    return snippets.map((snippet)=>{
        return {id:snippet.id.toString()}
    })
}
