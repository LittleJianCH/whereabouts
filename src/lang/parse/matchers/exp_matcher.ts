import pt from "@cicada-lang/partech"
import * as Exps from "../../exp"
import { Exp } from "../../exp"
import * as matchers from "../matchers"

export function exp_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "exp:operator": ({ operator }) => operator_matcher(operator),
    "exp:operand": ({ operand }) => operand_matcher(operand),
  })(tree)
}

export function operator_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operator:var": ({ name }, { span }) => Exps.Var(pt.str(name), span),
  })(tree)
}

export function operand_matcher(tree: pt.Tree): Exp {
  return pt.matcher<Exp>({
    "operand:string": ({ data }, { span }) =>
      Exps.String(pt.trim_boundary(pt.str(data), 1), span),
    "operand:number": ({ data }, { span }) =>
      Exps.Number(Number.parseFloat(pt.str(data)), span),
    "operand:null": ({}, { span }) => Exps.Null(span),
    "operand:true": ({}, { span }) => Exps.Boolean(true, span),
    "operand:false": ({}, { span }) => Exps.Boolean(false, span),
    "operand:arrai": ({ elements, last_element }, { span }) =>
      Exps.Arrai(
        [
          ...pt.matchers
            .zero_or_more_matcher(elements)
            .map(matchers.exp_matcher),
          matchers.exp_matcher(last_element),
        ],
        span,
      ),
    "operand:arrai_empty": ({}, { span }) => Exps.Arrai([], span),
    "operand:objekt": ({ properties, last_property }, { span }) =>
      Exps.ObjektUnfolded(
        [
          ...pt.matchers
            .zero_or_more_matcher(properties)
            .map(matchers.property_matcher),
          matchers.property_matcher(last_property),
        ],
        span,
      ),
    "operand:objekt_empty": ({}, { span }) => Exps.ObjektUnfolded([], span),
  })(tree)
}
