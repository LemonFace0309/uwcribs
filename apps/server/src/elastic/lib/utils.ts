export async function* batch<T>(
  gen: AsyncGenerator<T, void, undefined> | T[],
  size: number
): AsyncGenerator<T[], void, undefined> {
  let chunk: T[] = [];
  for await (const item of gen) {
    if (size && chunk.length >= size) {
      yield chunk;
      chunk = [];
    }
    chunk.push(item);
  }
  if (chunk.length) {
    yield chunk;
  }
}
