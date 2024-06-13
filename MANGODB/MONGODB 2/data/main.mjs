import mongoose from "mongoose"
import 'dotenv/config' 

const DB_URL = process.env.DB_URL

const connectDB = () => {
    mongoose.connect(DB_URL)

    mongoose.connection.on('connected', function () { //connected   
        console.log("Mongoose is connected");
    });

    mongoose.connection.on('disconnected', function () { //disconnected
        console.log("Mongoose is disconnected");
        process.exit(1);
    });

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ', err);
        process.exit(1);
    });

    process.on('SIGINT', function () {
        console.log("app is terminating");
        mongoose.connection.close(function () {
            console.log('Mongoose default connection closed');
            process.exit(0);
        });
    });

    return;
}
export default connectDB