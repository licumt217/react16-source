import React from 'react'

function getHeightBySize(size: string) {
    switch (size) {
        case "normal":
            return 20;
            break;
        case "large":
            return 30;
            break;
        case "small":
            return 10;
            break;
    }
}

export default function Space({ size = "normal" }: {
    size?: "normal" | "large" | "small"
}) {

    const height = getHeightBySize(size);
    return (
        <div style={{ height: height }}></div>
    )
}
