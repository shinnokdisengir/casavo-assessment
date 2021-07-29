export const f = (p: any) => (typeof p === "function" ? p : () => p);
