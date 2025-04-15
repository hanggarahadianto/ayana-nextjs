// // src/lib/mathUtils.ts
// export const calculatePercentage = (value: number, total: number) => {
//   if (total === 0) return 0;
//   return (value / total) * 100;
// };

// export class AdvancedStringUtils {
//   static capitalizeFirstLetter(str: string): string {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

//   static generateRandomString(length: number = 10): string {
//     // ... logika generate random string yang lebih kompleks
//     return Math.random()
//       .toString(36)
//       .substring(2, 2 + length);
//   }
// }

// // src/lib/analytics.ts (Wrapper untuk library analytics pihak ketiga)
// import * as ThirdPartyAnalytics from "some-analytics-library";

// export const trackEvent = (eventName: string, eventData?: any) => {
//   ThirdPartyAnalytics.track(eventName, eventData);
// };

// export const identifyUser = (userId: string, userData?: any) => {
//   ThirdPartyAnalytics.identify(userId, userData);
// };
