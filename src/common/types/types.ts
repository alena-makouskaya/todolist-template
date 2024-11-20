
export type BaseRespone< D = {}>= {
    data: D
    resultCode: number
    messages: Array<string>
}