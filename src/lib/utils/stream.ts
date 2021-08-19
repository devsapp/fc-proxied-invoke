
export function writeEventToStreamAndClose(stream: any, event?: any) {

    if (event) {
        stream.write(event);
    }

    stream.end();
}
