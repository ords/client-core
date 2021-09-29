import { LayoutConfig, pushNavigate, navigateBack } from ".";

type service_propertyDetail_scoreAdd = {
  propertyPreference: number;
};

const service_propertyDetail_scoreAdd: LayoutConfig<service_propertyDetail_scoreAdd> =
  {
    path: ":propertyPreference",
  };

pushNavigate(
  service_propertyDetail_scoreAdd,
  {
    propertyPreference: 123,
  },
  { root: "Hello" }
);

navigateBack(service_propertyDetail_scoreAdd, {
  propertyPreference: 123,
});
