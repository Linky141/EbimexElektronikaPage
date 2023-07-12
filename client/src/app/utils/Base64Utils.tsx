import { Dispatch, SetStateAction } from "react";

export function EncryptPictureToArray(file: any, setPictures: Dispatch<SetStateAction<string[]>>) {
 
    if (file !== undefined) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setPictures(previousState => [...previousState, reader.result!.toString()]);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
}