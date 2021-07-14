import { extend, localize } from "vee-validate";
import lang from "vee-validate/dist/locale/pt_BR.json";
import * as Rules from 'vee-validate/dist/rules'

for (var rule in Rules) {
  extend(rule, Rules[rule])
}

localize("pt_BR", lang);