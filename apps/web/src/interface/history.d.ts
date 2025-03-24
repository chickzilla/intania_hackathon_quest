/*export interface GetHistoryResponse{

}*/

export interface History{
    UserId: number;
    ID: number;
    Prompt : string;
    SadnessProb : number;
    LoveProb : number;
    JoyProb : number;
    AngryProb : number;
    FearProb : number;
    SurpriseProb : number;
    CreatedAt : Date;
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
