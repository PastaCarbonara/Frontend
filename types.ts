import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootDrawerParamList>;
    Recipe: { id: number };
    Match: { recipe: Recipe };
};
export type RootDrawerParamList = {
    Home: undefined;
    Profile: undefined;
    Groups: NavigatorScreenParams<GroupStackParamList>;
};
export type GroupStackParamList = {
    Groups: undefined;
    Group: { groupId: string };
    Invite: { groupId: string };
    CreateGroup: undefined;
    EditGroupScreen: { groupId: string };
};
export type UserImage = {
    file_url: string;
    filename: string;
};
export type Group = {
    id: string;
    name: string;
    image: Image;
    users: User[];
    swipe_sessions: SwipeSession[];
};
export type User = {
    id: string;
    display_name: string;
    is_admin: boolean;
    image: Image;
};
export type Tag = {
    id: number;
    name: string;
    tag_type: string;
};
export type SwipeSession = {
    id: string;
    session_date: string;
    status: SwipeSessionStatus;
    user_id: string;
    group_id: string;
    swipes: Swipe[];
    matches: Match[];
};
export type Swipe = {
    id: string;
    liked: boolean;
    recipe_id: number;
    user_id: string;
};
export type Match = {
    id: number;
    name: string;
    image: Image;
};
export type Image = {
    file_url: string;
    filename: string;
};
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
    spiciness: number;
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

export enum SwipeSessionStatus {
    'CANCELLED' = 'Gestopt',
    'COMPLETED' = 'Voltooid',
    'IN_PROGRESS' = 'Is bezig',
    'PAUSED' = 'Gepauzeerd',
    'READY' = 'Staat klaar',
}

export enum WebSocketAction {
    'CONNECTION_CODE' = 'CONNECTION_CODE',
    'GLOBAL_MESSAGE' = 'GLOBAL_MESSAGE',
    'RECIPE_MATCH' = 'RECIPE_MATCH',
    'RECIPE_SWIPE' = 'RECIPE_SWIPE',
    'POOL_MESSAGE' = 'POOL_MESSAGE',
    'SESSION_STATUS_UPDATE' = 'SESSION_STATUS_UPDATE',
}
