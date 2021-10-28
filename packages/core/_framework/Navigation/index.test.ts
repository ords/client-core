import { LayoutConfig } from "../FeatureRegistry";
import { Navigation } from ".";

const navigation = new Navigation();

const service_propertyDetail_scoreAdd: LayoutConfig<{
  propertyPreference: number;
}> = {
  path: ":propertyPreference",
};

navigation.push(
  service_propertyDetail_scoreAdd,
  {
    propertyPreference: 123,
  },
  { root: "Hello" }
);

navigation.back(service_propertyDetail_scoreAdd, {
  propertyPreference: 123,
});
