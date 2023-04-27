"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function PostForm() {
    const router = useRouter()
    const searchParams = useSearchParams();
    
    const [data, setData] = useState({
        name: searchParams.get('name') as string,
        body: "",
        authorId: searchParams.get('id')
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(JSON.stringify(data))
        const { authorId, body } = data

        // Send data to API route 
        const res = await fetch('http://localhost:3000/api/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorId, body
            })
        })

        const result = await res.json()
        console.log(result)

        // Navigate to thank you 
        router.push(`user/${authorId}/`)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const name = e.target.name

        setData(prevData => ({
            ...prevData,
            [name]: e.target.value
        }))
    }

    const canSave = [...Object.values(data)].every(Boolean)

    const content = (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl p-6">

            <h1 className="text-4xl mb-4">New Post</h1>

            <label className="text-2xl mb-1" htmlFor="name">Name:</label>
            <input
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                type="text"
                id="name"
                name="name"
                pattern="([A-Z])[\w+.]{1,}"
                value={data.name}
                onChange={handleChange}
                readOnly
            />

            <label className="text-2xl mb-1" htmlFor="message">Post Message:</label>
            <textarea
                className="p-3 mb-6 text-2xl rounded-2xl text-black"
                id="body"
                name="body"
                placeholder="Your post here..."
                rows={5}
                cols={33}
                value={data.body}
                onChange={handleChange}
            />

            <button
                className="p-3 mb-6 text-2xl rounded-2xl text-black border-solid border-white border-2 max-w-xs bg-slate-400 hover:cursor-pointer hover:bg-slate-300 disabled:hidden"
                disabled={!canSave}
            >Submit</button>

        </form>
    )

    return content
}