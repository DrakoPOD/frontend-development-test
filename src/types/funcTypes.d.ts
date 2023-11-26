export type IValidationRuleFunction<T> = (v: T) => true | string;

export type IValidateObjectOfRules = {
  [key in keyof ITask]?: Array<
    | IValidationRuleFunction<number>
    | IValidationRuleFunction<string>
    | IValidationRuleFunction<any>
  >;
};