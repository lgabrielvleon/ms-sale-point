import fetch from 'node-fetch';

export class ClientAPI {
    //#region Singleton
    private static instance: ClientAPI;
    private constructor() { };
    public static getInstance(): ClientAPI {
        if (!ClientAPI.instance) {
            ClientAPI.instance = new ClientAPI();
        }
        return ClientAPI.instance;
    }
    //#endregion

    public async fetchAPI<T>(
        method: string,
        url: string,
        headers?: any,
        body?: any,

    ): Promise<APIGenericResponse<T>> {
        try {
            let resAPIGeneric: APIGenericResponse<T> = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...headers
                },
                body: (typeof body !== undefined) ? JSON.stringify(body) : ''
            }).then(res => (res.json().then(json => ({ ok: res.ok, status: res.status, statusText: res.statusText, body: json }))));
            return resAPIGeneric;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
}