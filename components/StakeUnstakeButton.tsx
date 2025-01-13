import React, { useState } from "react";

export const StakeUnstakeToggle = () => {
    const [activeTab, setActiveTab] = useState("stake");

    return (
        <div
            role="tablist"
            aria-orientation="horizontal"
            className="inline-flex items-center border border-muted rounded-md px-1 py-1"
            style={{ outline: "none" }}
        >
            {/* Stake Button */}
            <button
                type="button"
                role="tab"
                aria-selected={activeTab === "stake"}
                className={`flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all
          ${
                    activeTab === "stake"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("stake")}
            >
                Stake
            </button>

            {/* Divider Between Buttons */}
            <div className="h-full w-px bg-muted" />

            {/* Unstake Button */}
            <button
                type="button"
                role="tab"
                aria-selected={activeTab === "unstake"}
                className={`flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all
          ${
                    activeTab === "unstake"
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("unstake")}
            >
                Unstake
            </button>
        </div>
    );
};





