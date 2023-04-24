export type RootStackParamList = {
    Root: undefined;
    Recipe: { id: number };
    Match: { recipe: Recipe };
    Group: { groupId: string };
    'Create New Group': undefined;
};
export type RootDrawerParamList = {
    Home: undefined;
    Profile: undefined;
    Groups: { myGroups: any };
};

export type Groups = {};
export type Recipe = {
    id: number;
    name: string;
    description: string;
    image: {
        file_url: string;
        filename: string;
    };
    creator: {};
    preparing_time: number;
    tags: string[];
    instructions: string[];
    ingredients: RecipeIngredient[];
    judgements: any[];
};
export type RecipeIngredient = Ingredient & {
    amount: number;
    unit: string;
};
export type Ingredient = {
    id: number;
    name: string;
};
export type WebSocketEvent = {
    action: WebSocketAction;
    payload: any;
};

export enum WebSocketAction {
    'CONNECTION_CODE' = 'CONNECTION_CODE',
    'GLOBAL_MESSAGE' = 'GLOBAL_MESSAGE',
    'RECIPE_MATCH' = 'RECIPE_MATCH',
    'RECIPE_SWIPE' = 'RECIPE_SWIPE',
    'SESSION_MESSAGE' = 'SESSION_MESSAGE',
    'SESSION_STATUS_UPDATE' = 'SESSION_STATUS_UPDATE',
}
