export type ActionResult<T, E> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: E };

// 성공 케이스만 받는 오버로드
export function createActionResult<T>(args: {
  success: true;
  data: T;
}): ActionResult<T, never>;
// 실패 케이스만 받는 오버로드
export function createActionResult<E>(args: {
  success: false;
  error: E;
}): ActionResult<never, E>;

// 실제 구현
export function createActionResult<T, E>(args: {
  success: boolean;
  data?: T;
  error?: E;
}): ActionResult<T, E> {
  if (args.success) {
    return { success: true, data: args.data! };
  } else {
    return { success: false, error: args.error! };
  }
}
