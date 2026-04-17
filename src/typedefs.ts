export type MavlinkField = {
    name: string,
    isArray: boolean,
    size: number,
    len?: string | undefined
}

export type MavlinkSchema = {
	type: string,
    fields: MavlinkField[]
};
export type MavlinkSchemaDict = {[key:string]: MavlinkSchema};

export let mavlink_processed:MavlinkSchemaDict | null = null;

export type DVDSHInput = {
    "_id": string,
    "socket_name": string,
    "data": {
        "meta": {
            "timestamp": number,
            "magic": number,
            "payloadLength": number,
            "incompatibilityFlags": number,
            "compatibilityFlags": number,
            "seq": number,
            "sysid": number,
            "compid": number,
            "msgid": number
        },
        "data": {[key:string]: any}
    },
    "timestamp": string
}

export type DVDSHDict = DVDSHInput[];

export type CLIArgs = {
    file: string,
    output: string
}