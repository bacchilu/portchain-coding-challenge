export interface Vessel {
    imo: number;
    name: string;
}

export interface Port {
    id: string;
    name: string;
}

export interface PortCall {
    port: Port;
    arrival: Date;
    departure: Date;
    isOmitted: boolean;
}

export type Schedule = PortCall[];

export interface PortDetail {
    name: string;
    portCalls: {arrival: Date; departure: Date; isOmitted: boolean}[];
}
