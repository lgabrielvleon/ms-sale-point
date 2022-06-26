export interface ConfigOrderModelRs{
    idOrderConfig: string,
    price: {
        amount: number,
        originalAmount: number
    },
    schedule: string,
    stock: number
}