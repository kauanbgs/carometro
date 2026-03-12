import { useEffect, useState } from "react";

export default function Alert({ type, message, onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
        }
    }, [message]);

    if (!message) return null;

    const isSuccess = type === "success";

    return (
        <div
            className={`flex items-center p-4 rounded-xl border w-[50%] h-12 mx-auto
                ${isSuccess
                    ? "bg-green-50 border-green-300 text-green-800"
                    : "bg-red-100 border-red-300 text-red-800"
                }
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
            `}
        >
            <span className="text-sm flex-1 text-center">{message}</span>
        </div>
    );
}
