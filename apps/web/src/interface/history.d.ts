/*export interface GetHistoryResponse{

}*/

export interface History{
    id: number;
    prompt : string;
    sadnessProb : number;
    loveProb : number;
    joyProb : number;
    angryProb : number;
    fearProb : number;
    surpriseProb : number;
    createdAt : Date;
}

export interface HistoryForTable{
    prompt : string;
    sadnessProb : number;
    loveProb : number;
    joyProb : number;
    angryProb : number;
    fearProb : number;
    surpriseProb : number;
    date: Date;
    time: Date;
}

export interface HistoryResponse{
    data?: HistoryData;
    error?: any;
}

export interface HistoryData{
    items: History[];
    metaData : MetaData;
}

export interface MetaData{
    total : number;
    count : number;
}
