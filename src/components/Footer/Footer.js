import React from "react";
import  "./Footercss";

export default function Footer() {
    const links = ["Templates", "Pricing", "Apps", "Jobs", "Blog", "Developers", "About", "Help", "Legal", "Cookie Settings", "Privacy"];
    return (
        <footer className="footer">
            <select>
                <option>Light Mode</option>
                <option>Dark Mode (Coming Soon)</option>
            </select>
            <ul>
                {links.map(link => (
                    <li key={link}>{link}</li>
                ))}
            </ul>
            <p className={"copyright"}>
                © Copyright 2021. All rights reserved. Created by Chase.
            </p>
        </footer>
    );
}