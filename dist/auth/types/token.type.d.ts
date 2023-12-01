export type Token = {
    access_token: string;
    refresh_token: string;
};
export type NewToken = {
    access_token: string;
};
export type newQueue = {
    id: number;
    name: string;
    address: string;
    gender: string;
    data: {};
};
export type ServiceCashier = {
    name: string;
    type: string;
    price: number;
};
