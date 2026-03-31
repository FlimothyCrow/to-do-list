"use client"; // Required because we are using useEffect/useState
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetching from your Flask local server
        fetch("http://127.0.0.1:5000/api/data")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Flask is likely not running:", err));
    }, []);

    return (
        <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
            <h1>Next.js + Flask Connection Test</h1>

            {!data ? (
                <p>Waiting for Flask...</p>
            ) : (
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <p>
                        <strong>Status:</strong> {data.status}
                    </p>
                    <p>
                        <strong>Message:</strong> {data.message}
                    </p>
                    <p>
                        <strong>Tools in use:</strong> {data.items.join(", ")}
                    </p>
                </div>
            )}
        </div>
    );
}
