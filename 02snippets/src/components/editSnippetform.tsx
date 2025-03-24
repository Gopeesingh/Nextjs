"use client"

import { Editor } from "@monaco-editor/react";
import React, { useState } from "react";
import type { Snippets } from "@prisma/client";
import { Button } from "./ui/button";
import {saveSnippet} from "@/actions";

const EditSnippetForm = ({snippet}:{snippet:Snippets}) =>{
    const [code, setCode] = useState(snippet.code)

    const saveSnippetAction = saveSnippet.bind(null, snippet.id, code);
    return(
        <div className="flex flex-col gap-4">
            <form action={saveSnippetAction} className="flex items-center justify-between">
                <h1 className="font-bold text-xl">Your code Editor:</h1>
                <Button type="submit" className="bg-green-500 text-white hover:bg-green-600">Save</Button>
            </form>
            <Editor
                height="40vh"
                defaultLanguage="javascript"
                defaultValue={code}
                onChange={(newValue) => setCode(newValue || "")}
                theme="vs-dark"
                />
        </div>
    )
}

export default EditSnippetForm;