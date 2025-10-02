"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { formatDateToYMD, timeAgo, formatTo12HourTime } from "@/utils/formUtils"

export default function ProjectNotesList({ projectId, initialNotes }) {
    const [notes, setNotes] = useState(initialNotes);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);

    const fetchMore = useCallback(async () => {
        if (!hasMore || loading) return;

        setLoading(true);
        const res = await fetch(`/api/projects/${projectId}/notes?page=${page}&limit=10`, {
            cache: "no-store",
        });
        const data = await res.json();

        setNotes(prev => [...prev, ...data.notes]);
        setHasMore(data.hasMore);
        setLoading(false);
    }, [page, hasMore, loading, projectId]);

    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) observer.observe(loader.current);
        return () => {
            if (loader.current) observer.unobserve(loader.current);
        };
    }, [hasMore, loading]);

    useEffect(() => {
        if (page > 1) {
            fetchMore();
        }
    }, [page]);

    return (
        <ul>
            {notes.map((note, index) => (
                <li key={index} className="mb-5">
                    <div className="flex items-center gap-2">
                        <Image
                            src={note?.createdBy?.profilePictureUrl || "/placeholder-avatar.svg"}
                            width={35}
                            height={35}
                            priority
                            alt="avatar"
                            className="rounded-full"
                        />
                        <div>
                            <p className="text-sm text-gray-600">
                                <span className="font-bold">{note?.createdBy === null
                                    ? "Stratital Team"
                                    : note?.createdBy?.name}</span>{" "}
                                - {timeAgo(note?.createdAt)} at{" "}
                                {formatTo12HourTime(note?.createdAt)}
                            </p>
                            <span className="text-detail text-xs">
                                {note?.createdBy?.companyName}
                            </span>
                        </div>
                    </div>

                    <div className="max-w-5xl text-lg ml-11 font-medium prose prose-a:text-blue-500 prose-a:underline text-content">
                        {parse(note?.note)}
                    </div>
                </li>
            ))}

            {hasMore && (
                <div
                    ref={loader}
                    className="h-10 flex justify-center items-center text-gray-500"
                >
                    {loading ? "Loading..." : "Scroll for more"}
                </div>
            )}
        </ul>
    );
}

