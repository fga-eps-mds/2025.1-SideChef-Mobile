import { Double } from "react-native/Libraries/Types/CodegenTypes";

export default class CalculateNutritionalValues {
  public static calculateCalories(amount: Double, caloriesPerAmount: Double): Double {
    return amount * caloriesPerAmount;
  }
}