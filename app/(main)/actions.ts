"use server";

// FormData {
//   deokdam: '테스트테스트',
//   openAt: '2025. 8. 2.',
//   isPublic: '0'
// }

export async function postMessage(_: unknown, formdata: FormData) {
  console.log(formdata);
  return;
}
