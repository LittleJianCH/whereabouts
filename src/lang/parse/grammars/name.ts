import pt from "@cicada-lang/partech"

/**

   Preserve keywords for JSON.

   TODO Preserve keywords goal.

**/

export const name = pt.grammars.pattern_unless_preserved("identifier", ["null", "true", "false"])

export const names = {
  $grammar: {
    "names:names": [
      { names: { $ap: ["zero_or_more", "name", '","'] } },
      { last_name: "name" },
      { $ap: ["optional", '","'] },
    ],
  },
}
