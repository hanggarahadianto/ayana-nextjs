// //  helper berisi yang komples
// ini contohnya
// // src/helpers/dataProcessing.ts
// export const processUserDataForDisplay = (userData: any) => {
//   return {
//     fullName: `${userData.firstName} ${userData.lastName}`,
//     formattedRegistrationDate: formatDate(userData.registrationDate), // Menggunakan fungsi dari utils
//     // ... logika pemrosesan lainnya
//   };
// };

// // src/helpers/uiHelpers.ts
// export const getStatusLabel = (status: string) => {
//   switch (status) {
//     case 'pending':
//       return 'Menunggu Konfirmasi';
//     case 'approved':
//       return 'Disetujui';
//     case 'rejected':
//       return 'Ditolak';
//     default:
//       return status.toUpperCase();
//   }
// };

// // src/helpers/apiHelpers.ts
// export const buildUserUpdateRequestPayload = (formData: any) => {
//   const { id, ...rest } = formData;
//   return { ...rest }; // Contoh menghilangkan ID dari payload update
// };
