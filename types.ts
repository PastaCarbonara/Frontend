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