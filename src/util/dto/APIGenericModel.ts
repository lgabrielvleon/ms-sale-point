interface APIGenericResponse<T> { 
    ok: boolean,
    status: number,
    statusText: string,
    body: T
}