import "@testing-library/jest-dom/vitest";

process.on("unhandledRejection", (reason, promise) => {
    console.warn("Unhandled Rejection detected:", reason);
    console.warn("Promise causing the rejection:", promise);
});
