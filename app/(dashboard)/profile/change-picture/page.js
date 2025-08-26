'use client';

import Container from "@/components/dashboardComponents/Container"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";

const ChangePicturePage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) {
            setFile(selectedFile);
        } else {
            alert("File must be an image under 5MB");
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            alert("Uploaded successfully! Login again to see changes");
            console.log("Image URL:", data.url);
        } else {
            alert(data.error);
        }
    };
    return (
        <Container className={'bg-white p-2 md:p-4'}>
            <h1 className="text-2xl md:text-4xl font-bold">Change Profile Picture</h1>
            <div className="mt-4 grid gap-4">
                <Input onChange={handleChange} name='file' type={'file'} className={'max-w-2xl'} accept="image/*" />
                <Button onClick={handleUpload} disabled={loading} type='submit' className={'max-w-2xl'}>{loading ? "Uploading..." : "Upload"}</Button>
            </div>
        </Container>
    )
}

export default ChangePicturePage