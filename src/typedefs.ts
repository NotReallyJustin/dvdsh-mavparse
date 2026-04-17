export type MavlinkSchema = {
	type: string,
    fields: [{
        name: string,
        isArray: boolean,
        size: number,
        len: number | undefined
    }]
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
        "data": {
            "time_usec": number,
            "lat": number,
            "lon": number,
            "alt": number,
            "eph": number,
            "epv": number,
            "vel": number,
            "cog": number,
            "fix_type": number,
            "satellites_visible": number,
            "alt_ellipsoid": number,
            "h_acc": number,
            "v_acc": number,
            "vel_acc": number,
            "hdg_acc": number,
            "yaw": number
        }
    },
    "timestamp": string
}

export type DVDSHDict = DVDSHInput[];

export type CLIArgs = {
    file: string,
    output: string
}