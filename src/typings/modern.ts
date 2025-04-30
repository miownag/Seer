interface IMatch<T = unknown> {
  handle: Record<string, T>;
}

type matchesType = IMatch[];

export type { matchesType };
