
export interface User {
    id: number | null;
    name?: string | null | undefined;
    email?: string | null | undefined;
    taller?: string | null | undefined;
    rol?: string | null  | undefined;
    token?: string | null | undefined;
    exp?: number | null | undefined;
}