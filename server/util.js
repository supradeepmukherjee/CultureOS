import { connect } from "mongoose"

export const connectDB = async uri => {
    try {
        await connect(uri)
        console.log('Connected to DB')
    } catch (err) {
        console.log(err)
    }
}

export class ErrorHandler extends Error {
    constructor(status, msg) {
        super(msg)
        this.status = status
        this.msg = msg
    }
}