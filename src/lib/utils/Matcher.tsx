function MatcherBuilder<Match, Value>(match: Match, value?: Value) {
  return {
    match: <V,>(matcher: Match, cb: () => V) => {
      if (matcher === match) {
        return MatcherBuilder(match, cb());
      }
      return MatcherBuilder(match, value as unknown as V);
    },
    matchMany: <V,>(matcher: Match[], cb: () => V) => {
      if (matcher.includes(match)) {
        return MatcherBuilder(match, cb());
      }
      return MatcherBuilder(match, value as unknown as V);
    },
    get: (): Value | undefined => value,
    getOrElse: <V,>(newValue: () => V): V | NonNullable<Value> => {
      if (value === null || value === undefined) {
        return newValue();
      }
      return value as V | NonNullable<Value>;
    },
  };
}

export const Matcher = <Match,>(match: Match) => {
  return MatcherBuilder(match);
};
