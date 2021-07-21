import React, { useContext } from 'react';
import { PropertyAddModel } from '../../../models/property';
import MainContext from '../../../store/MainContext';
import { SelectInputPropertyDiv } from './SelectInputPropertyDiv';

const SelectInputProperty = (props: PropertyAddModel): JSX.Element => {
  const context = useContext(MainContext);

  function changeValue(value: string) {
    console.log(value);
    context?.setState({
      ...context.state,
      [props.field]: value,
    });
  }

  return (
    <SelectInputPropertyDiv className="property-select">
      <select
        value={props.value}
        onChange={evt => changeValue(evt.target.value)}
      >
        <option value="">Selecione</option>
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espirito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MT">Mato Grosso</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
      </select>
    </SelectInputPropertyDiv>
  );
};

export default React.memo(SelectInputProperty);
