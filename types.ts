export type Recipe = {
    id: number,
    name: string,
    description: string,
    image: string,
    creator: {},
    preparing_time: number,
    tags: string[],
    instructions: string[],
    ingredients: RecipeIngredient[],
    judgements: any[],
}
export type RecipeIngredient = Ingredient & {
    amount: number,
    unit: string,
}
export type Ingredient = {
    id: number,
    name: string,
}
export type WebSocketEvent = {
    action: WebSocketAction,
    payload: any,
}
export enum WebSocketAction {
    'REQUEST_SESSION_MESSAGE',
    'REQUEST_GLOBAL_MESSAGE',
    'REQUEST_RECIPE_LIKE',
    'RESPONSE_CONNECTION_CODE',
    'RESPONSE_SESSION_MESSAGE',
    'RESPONSE_GLOBAL_MESSAGE',
    'RESPONSE_RECIPE_MATCH',
}