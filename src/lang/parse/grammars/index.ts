import pt from "@cicada-lang/partech"

export const zero_or_more = pt.grammars.zero_or_more
export const one_or_more = pt.grammars.one_or_more
export const optional = pt.grammars.optional
export const dashline = pt.grammars.dashline

export * from "./exp"
export * from "./goal"
export * from "./import_binding"
export * from "./key"
export * from "./name"
export * from "./property"
export * from "./query_option"
export * from "./stmt"
